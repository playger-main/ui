// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

type AuthResponse = {
  accessToken?: string;
  refreshToken?: string;
  access_token?: string;   // на случай snake_case
  refresh_token?: string;  // на случай snake_case
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = environment.apiUrl.replace(/\/+$/, ''); // без завершающего /

  // ключи хранения (оставляю как у тебя, snake_case)
  private ACCESS_KEY = 'access_token';
  private REFRESH_KEY = 'refresh_token';

  constructor(private http: HttpClient, private router: Router) {}

  /** Логин: запрос, сохранение токенов и переход */
  login(user: string, password: string) {
    // возвращаем subscription как у тебя (минимум правок в компонентах)
    return this.http
      .post<AuthResponse>(`${this.api}/auth/signin`, { user, password })
      .subscribe({
        next: async (res) => {
          const { accessToken, refreshToken } = this.pickTokens(res);
          await this.saveTokens(accessToken, refreshToken);
          this.router.navigate(['/profile']);
        },
        error: (err) => {
          console.error('Ошибка входа', err);
          alert(err?.error?.message ?? 'Ошибка входа');
        },
      });
  }

  /** Регистрация: без токенов, просто редирект и уведомление */
  register(username: string, email: string, password: string) {
    return this.http
      .post(`${this.api}/auth/signup`, { username, email, password })
      .subscribe({
        next: () => {
          alert(
            `На ${email} выслано письмо для подтверждения почты. `
            + `Если не находите письмо, проверьте спам.`
          );
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Ошибка регистрации', error);
          alert(error?.error?.message || 'Ошибка регистрации');
        },
      });
  }

  /**
   * Обновление access_token через refresh_token
   * Возвращает новый access_token или null (если не удалось).
   */
  async refreshToken(): Promise<string | null> {
    const refresh = await this.getRefreshToken();
    if (!refresh) {
      await this.logout();
      return null;
    }

    try {
      // важный момент: путь должен совпадать с исключением в интерцепторе (shouldSkip)
      const res = await firstValueFrom(
        this.http.post<AuthResponse>(`${this.api}/auth/refresh`, { refreshToken: refresh })
      );

      const { accessToken, refreshToken } = this.pickTokens(res);

      // сохраняем новый access; если пришёл новый refresh — тоже обновим
      if (accessToken) {
        await Preferences.set({ key: this.ACCESS_KEY, value: accessToken });
      }
      if (refreshToken && refreshToken !== refresh) {
        await Preferences.set({ key: this.REFRESH_KEY, value: refreshToken });
      }

      return accessToken ?? null;
    } catch (error) {
      console.error('Ошибка обновления токена', error);
      await this.logout();
      return null;
    }
  }

  /** Достаём токены из ответа в любом кейсе (camelCase/snake_case) */
  private pickTokens(res: AuthResponse): { accessToken: string; refreshToken: string } {
    const accessToken = res.accessToken ?? res.access_token ?? '';
    const refreshToken = res.refreshToken ?? res.refresh_token ?? '';
    return { accessToken, refreshToken };
  }

  /* ========= ХРАНИЛИЩЕ (Capacitor Preferences) ========= */

  async saveTokens(accessToken: string, refreshToken: string) {
    if (accessToken) {
      await Preferences.set({ key: this.ACCESS_KEY, value: accessToken });
    }
    if (refreshToken) {
      await Preferences.set({ key: this.REFRESH_KEY, value: refreshToken });
    }
  }

  async getAccessToken(): Promise<string | null> {
    const { value } = await Preferences.get({ key: this.ACCESS_KEY });
    return value ?? null;
  }

  async getRefreshToken(): Promise<string | null> {
    const { value } = await Preferences.get({ key: this.REFRESH_KEY });
    return value ?? null;
  }

  async removeTokens() {
    await Preferences.remove({ key: this.ACCESS_KEY });
    await Preferences.remove({ key: this.REFRESH_KEY });
  }

  /** Выход */
  async logout() {
    await this.removeTokens();
    this.router.navigate(['/login']);
  }
}
