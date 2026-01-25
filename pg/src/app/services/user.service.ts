// ui/pg/src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError } from 'rxjs';
import { environment } from '../../environments/environment';
import { ICurrentUser, IUser } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly api = environment.apiUrl.replace(/\/+$/, '');

  constructor(private http: HttpClient) {}

  /** GET /user/me (jwt) */
  getMe(): Observable<ICurrentUser | null> {
    return this.http.get<ICurrentUser>(`${this.api}/user/me`).pipe(
      catchError((err) => {
        console.warn('GET /user/me failed:', err);
        return of(null);
      })
    );
  }

  /** alias для старого кода */
  getCurrentUser(): Observable<ICurrentUser | null> {
    return this.getMe();
  }

  /** GET /user/:id */
  getUserById(id: string): Observable<IUser | null> {
    return this.http.get<IUser>(`${this.api}/user/${id}`).pipe(
      catchError((err) => {
        console.warn(`GET /user/${id} failed:`, err);
        return of(null);
      })
    );
  }

  /** trainer/admin может создавать event */
  canCreateEvent(user: ICurrentUser | null): boolean {
    const roles = user?.roles ?? [];
    return roles.includes('trainer') || roles.includes('admin');
  }
}
