import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://playground-back-production.up.railway.app';  // URL бэкенда
  constructor(private http: HttpClient, private router: Router) {}

  // Логин: получаем access_token и refresh_token
   
  login(user: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/auth/signin`, { user, password }).subscribe(async (response) => {
      await this.saveTokens(response.access_token, response.refresh_token);      
      this.router.navigate(['/profile']);
    });
  }

  // Метод регистрации пользователя
  register(username: string, email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/auth/signup`, {username, email, password }).subscribe(
      (response) => {
        // alert('Письмо с подтверждением отправлено на вашу почту');
        alert('Регистрация успешна!');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Ошибка регистрации', error);
        alert(error.error.message || 'Ошибка регистрации');
      }
    );
  }

   // Обновление access_token через refresh_token
   async refreshToken(): Promise<string | null>  {
    const refreshToken = await this.getRefreshToken();
    if (!refreshToken) {
      this.logout();
      return null;
    }
    try {
      const response = await this.http.post<any>(`${this.apiUrl}/refresh-token`, { refreshToken }).toPromise();
      await this.saveTokens(response.access_token, refreshToken);
      return response.accessToken;
    } catch (error) {
      console.error('Ошибка обновления токена', error);
      this.logout();
      return null;
    }
  }

    
   

  // Сохраняем токены в Preferences
  async saveTokens(accessToken: string, refreshToken: string) {
    await Preferences.set({ key: 'access_token', value: accessToken });
    await Preferences.set({ key: 'refresh_token', value: refreshToken });
  }

  // Получаем токены
  async getAccessToken() {
    const { value } = await Preferences.get({ key: 'access_token' });
    return value;
  }

  async getRefreshToken() {
    const { value } = await Preferences.get({ key: 'refresh_token' });
    return value;
  }

  // Удаление токенов
  async removeTokens() {
    await Preferences.remove({ key: 'access_token' });
    await Preferences.remove({ key: 'refresh_token' });
  }

  // Логика выхода из системы
 async logout() {
    await this.removeTokens();
    this.router.navigate(['/login']);
  }
}
