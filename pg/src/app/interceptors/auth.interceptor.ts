import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, from, BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshAccessToken$ = new BehaviorSubject<string | null>(null);

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.shouldSkip(req)) {
      return next.handle(req);
    }

    return from(this.auth.getAccessToken()).pipe(
      switchMap((token) => next.handle(this.addAuthHeader(req, token))),
      catchError((err) => {
        // ✅ ловим удаленного пользователя / невалидную сессию
        if (err instanceof HttpErrorResponse) {
          // 1) пользователь удалён в БД (твой кейс)
          if (this.isUserDoesNotExist(err)) {
            void this.auth.logout();
            return throwError(() => err);
          }

          // 2) если access/refresh протухли и сервер отвечает 403 вместо 401
          if (err.status === 403) {
            void this.auth.logout();
            return throwError(() => err);
          }

          // 3) refresh логика — только для 401
          if (err.status === 401) {
            return this.handle401(err, req, next);
          }
        }

        return throwError(() => err);
      })
    );
  }

  private addAuthHeader(req: HttpRequest<any>, token?: string | null): HttpRequest<any> {
    const t = this.normalizeToken(token);
    if (!t || req.headers.has('Authorization')) return req;
    return req.clone({ setHeaders: { Authorization: `Bearer ${t}` } });
  }

  private normalizeToken(token: any): string | null {
    if (token == null) return null;
    const t = String(token).trim();
    if (!t || t === 'undefined' || t === 'null') return null;
    return t;
  }

  private handle401(
    error: HttpErrorResponse,
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.shouldSkip(req)) {
      return throwError(() => error);
    }

    if (this.isRefreshing) {
      return this.refreshAccessToken$.pipe(
        filter((t): t is string => t !== null),
        take(1),
        switchMap((newToken) => next.handle(this.addAuthHeader(req, newToken)))
      );
    }

    this.isRefreshing = true;
    this.refreshAccessToken$.next(null);

    return from(this.auth.refreshToken()).pipe(
      switchMap((newTokenRaw) => {
        const newToken = this.normalizeToken(newTokenRaw);
        this.isRefreshing = false;

        if (newToken) {
          this.refreshAccessToken$.next(newToken);
          return next.handle(this.addAuthHeader(req, newToken));
        }

        void this.auth.logout();
        return throwError(() => error);
      }),
      catchError((refreshErr) => {
        this.isRefreshing = false;
        void this.auth.logout();
        return throwError(() => refreshErr);
      })
    );
  }

  private shouldSkip(req: HttpRequest<any>): boolean {
    const url = req.url.toLowerCase();

    // OPTIONS / preflight
    if (req.method.toUpperCase() === 'OPTIONS') return true;

    // auth endpoints
    if (/\/auth\/(signin|signup|refresh|confirm)/.test(url)) return true;

    return false;
  }

  private isUserDoesNotExist(err: HttpErrorResponse): boolean {
    if (err.status !== 404) return false;

    // err.error может быть string или объект { message, error, statusCode }
    const e = err.error as any;

    const msg =
      typeof e === 'string'
        ? e
        : typeof e?.message === 'string'
          ? e.message
          : Array.isArray(e?.message)
            ? e.message.join(' ')
            : '';

    return msg.toLowerCase().includes("user doesn't exist");
  }
}
