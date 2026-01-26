import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { firstValueFrom, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

type AuthResponse = {
  accessToken?: string;
  refreshToken?: string;
  access_token?: string;
  refresh_token?: string;
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = environment.apiUrl.replace(/\/+$/, '');

  private ACCESS_KEY = 'access_token';
  private REFRESH_KEY = 'refresh_token';

  constructor(private http: HttpClient, private router: Router) {}

  /* ===================== API ===================== */

  /** Логин: возвращает Observable, подписка в компоненте */
  login(user: string, password: string): Observable<void> {
    return this.http.post<AuthResponse>(`${this.api}/auth/signin`, { user, password }).pipe(
      map((res) => this.pickTokens(res)),
      tap(async ({ accessToken, refreshToken }) => {
        await this.saveTokens(accessToken, refreshToken);
      }),
      map(() => void 0)
    );
  }

  /** Регистрация: возвращает Observable, подписка в компоненте */
  register(username: string, email: string, password: string): Observable<void> {
    return this.http.post<void>(`${this.api}/auth/signup`, { username, email, password });
  }

  /**
   * Refresh: ВАЖНО для твоего NestJS:
   * - JwtRefreshGuard обычно проверяет refresh из Authorization header
   * - AuthService.refresh() у тебя читает req.body.refreshToken
   * Поэтому отправляем refresh и в header, и в body.
   */
  async refreshToken(): Promise<string | null> {
    const refresh = await this.getRefreshToken();
    if (!refresh) {
      await this.logout();
      return null;
    }

    try {
      const headers = new HttpHeaders({ Authorization: `Bearer ${refresh}` });

      const res = await firstValueFrom(
        this.http.post<AuthResponse>(
          `${this.api}/auth/refresh`,
          { refreshToken: refresh },   // ✅ body для твоей проверки
          { headers }                  // ✅ чтобы JwtRefreshGuard пропустил
        )
      );

      const { accessToken, refreshToken } = this.pickTokens(res);

      // если refreshToken не пришёл — оставляем старый refresh
      await this.saveTokens(accessToken, refreshToken || refresh);

      return this.normalizeToken(accessToken);
    } catch (err) {
      console.error('refreshToken failed:', err);
      await this.logout();
      return null;
    }
  }

  /* ===================== TOKENS ===================== */

  private pickTokens(res: AuthResponse): { accessToken: string; refreshToken: string } {
    const accessToken = res.accessToken ?? res.access_token ?? '';
    const refreshToken = res.refreshToken ?? res.refresh_token ?? '';
    return { accessToken, refreshToken };
  }

  private normalizeToken(value: string | null | undefined): string | null {
    const t = (value ?? '').trim();
    if (!t || t === 'undefined' || t === 'null') return null;
    return t;
  }

  async saveTokens(accessToken?: string, refreshToken?: string) {
    const at = this.normalizeToken(accessToken ?? null);
    const rt = this.normalizeToken(refreshToken ?? null);

    if (at) {
      await Preferences.set({ key: this.ACCESS_KEY, value: at });
    } else {
      await Preferences.remove({ key: this.ACCESS_KEY });
    }

    if (rt) {
      await Preferences.set({ key: this.REFRESH_KEY, value: rt });
    } else {
      await Preferences.remove({ key: this.REFRESH_KEY });
    }
  }

  async getAccessToken(): Promise<string | null> {
    const { value } = await Preferences.get({ key: this.ACCESS_KEY });
    return this.normalizeToken(value);
  }

  async getRefreshToken(): Promise<string | null> {
    const { value } = await Preferences.get({ key: this.REFRESH_KEY });
    return this.normalizeToken(value);
  }

  async removeTokens() {
    await Preferences.remove({ key: this.ACCESS_KEY });
    await Preferences.remove({ key: this.REFRESH_KEY });
  }

  async logout() {
    await this.removeTokens();
    this.router.navigate(['/login']);
  }
}
