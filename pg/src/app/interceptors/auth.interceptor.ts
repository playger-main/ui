// src/app/interceptors/auth.interceptor.ts
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
    // не добавляем заголовок на auth-ручки (signin/signup/refresh/confirm-email)
    if (this.shouldSkip(req)) {
      return next.handle(req);
    }

    return from(this.auth.getAccessToken()).pipe(
      switchMap((token) => {
        const authedReq = this.addAuthHeader(req, token);
        return next.handle(authedReq);
      }),
      catchError((err) => this.handle401(err, req, next))
    );
  }

  /** Добавляем Authorization, если есть токен и его не проставили выше по цепочке */
  private addAuthHeader(req: HttpRequest<any>, token?: string | null): HttpRequest<any> {
    if (!token || req.headers.has('Authorization')) return req;
    return req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  /** Обработка 401: один рефреш для пачки запросов, остальные ждут */
  private handle401(
    error: any,
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!(error instanceof HttpErrorResponse)) {
      return throwError(() => error);
    }

    // рефрешим ТОЛЬКО на 401 и если это не auth-эндпоинт
    if (error.status !== 401 || this.shouldSkip(req)) {
      return throwError(() => error);
    }

    // если уже идёт обновление — ждём, пока придёт новый токен
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
      switchMap((newToken) => {
        this.isRefreshing = false;

        if (newToken) {
          this.refreshAccessToken$.next(newToken);
          const retried = this.addAuthHeader(req, newToken);
          return next.handle(retried);
        }

        // не удалось обновить — выходим из аккаунта
        this.auth.logout?.();
        return throwError(() => error);
      }),
      catchError((refreshErr) => {
        this.isRefreshing = false;
        this.auth.logout?.();
        return throwError(() => refreshErr);
      })
    );
  }

  /** Какие запросы пропускать без токена/рефреша */
  private shouldSkip(req: HttpRequest<any>): boolean {
    // не добавляем токен и не рефрешим для самих auth-роутов
    // подгони регулярку под свои пути, если отличаются
    const url = req.url.toLowerCase();
    const isAuth = /\/auth\/(signin|signup|refresh|confirm-email)/.test(url);
    // preflight/OPTIONS обычно без токена
    const isPreflight = req.method.toUpperCase() === 'OPTIONS';
    return isAuth || isPreflight;
  }
}
