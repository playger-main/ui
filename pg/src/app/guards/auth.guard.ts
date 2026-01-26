import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean | UrlTree> {
    try {
      let token = await this.authService.getAccessToken();

      // ✅ нормализуем "undefined"/"null"/пустую строку
      token = this.normalizeToken(token);

      if (!token) {
        const refreshed = await this.authService.refreshToken();
        token = this.normalizeToken(refreshed);
      }

      if (token) return true;

      return this.router.createUrlTree(['/login'], {
        queryParams: { redirect: this.router.url },
      });
    } catch (err) {
      console.warn('AuthGuard failed:', err);
      return this.router.createUrlTree(['/login'], {
        queryParams: { redirect: this.router.url },
      });
    }
  }

  private normalizeToken(token: any): string | null {
    if (token == null) return null;
    const t = String(token).trim();
    if (!t || t === 'undefined' || t === 'null') return null;
    return t;
  }
}
