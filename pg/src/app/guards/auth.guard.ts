import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    let token = await this.authService.getAccessToken();

    if (!token) {
      token = await this.authService.refreshToken();
    }

    if (token) {
      return true; // Доступ разрешён
    } else {
      this.router.navigate(['/login']); // Перенаправление на страницу входа
      return false;
    }
  }
}
