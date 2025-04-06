import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.authService.getAccessToken()).pipe(
      switchMap(token => {
        const clonedReq = token
          ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
          : req;

        return next.handle(clonedReq).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              return from(this.authService.refreshToken()).pipe(
                switchMap(newToken => {
                  if (newToken) {
                    const newReq = req.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } });
                    return next.handle(newReq);
                  }
                  return throwError(() => error);
                })
              );
            }
            return throwError(() => error);
          })
        );
      })
    );
  }
}
