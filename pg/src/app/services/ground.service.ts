import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IGround } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GroundService {
  /** выбранный вид спорта */
  selectedSport = signal<string>('');

  private readonly FAVORITES_KEY = 'favoriteGrounds';
  private readonly api = environment.apiUrl.replace(/\/+$/, ''); // без завершающего /

  constructor(private http: HttpClient) {}

  setSelectedGround(value: string) {
    this.selectedSport.set(value);
  }

  getSelectedGround() {
    return this.selectedSport;
  }

  /** получить все площадки с сервера + привести geolocation к number */
  getAllGrounds(): Observable<IGround[]> {
    return this.http.get<any[]>(`${this.api}/ground`).pipe(
      map((list) =>
        (Array.isArray(list) ? list : []).map((g) => ({
          id: String(g.id ?? ''),
          name: String(g.name ?? ''),
          description: g.description ?? '',
          address: g.address ?? '',

          kindofsport: Array.isArray(g.kindofsport) ? g.kindofsport : [],
          coverage: Array.isArray(g.coverage) ? g.coverage : [],

          geolocation: {
            lat: Number(g.geolocation?.lat ?? 0),
            lng: Number(g.geolocation?.lng ?? 0),
          },

          createdAt: g.createdAt,
          updatedAt: g.updatedAt,

          eventsCount: Number(g.eventsCount ?? 0),
          isFavorite: Boolean(g.isFavorite),
          avgRating: Number(g.avgRating ?? 0),

          avatar: g.avatar,
        }))
      ),
      catchError((err) => {
        console.warn('GET /ground failed:', err);
        return of<IGround[]>([]);
      })
    );
  }

  /** получить площадки для выбранного вида спорта (kindofsport: string[]) */
  getListOfGroundsForChosenSport(): Observable<IGround[]> {
    const kind = (this.selectedSport() ?? '').toLowerCase();

    let params = new HttpParams();
    if (kind) params = params.set('kind', kind); // если бэк поддерживает

    return this.http.get<any[]>(`${this.api}/ground`, { params }).pipe(
      map((list) =>
        (Array.isArray(list) ? list : []).map((g) => ({
          id: String(g.id ?? ''),
          name: String(g.name ?? ''),
          description: g.description ?? '',
          address: g.address ?? '',
          kindofsport: Array.isArray(g.kindofsport) ? g.kindofsport : [],
          coverage: Array.isArray(g.coverage) ? g.coverage : [],
          geolocation: {
            lat: Number(g.geolocation?.lat ?? 0),
            lng: Number(g.geolocation?.lng ?? 0),
          },
          createdAt: g.createdAt,
          updatedAt: g.updatedAt,
          eventsCount: Number(g.eventsCount ?? 0),
          isFavorite: Boolean(g.isFavorite),
          avgRating: Number(g.avgRating ?? 0),
          avatar: g.avatar,
        }))
      ),
      map((list) =>
        kind
          ? list.filter((g) =>
              g.kindofsport?.some((s: any) => String(s).toLowerCase() === kind)
            )
          : list
      ),
      catchError((err) => {
        console.warn('GET /ground (with kind) failed:', err);
        return of<IGround[]>([]);
      })
    );
  }

  getGroundById(id: string): Observable<IGround | null> {
    return this.http.get<any>(`${this.api}/ground/${id}`).pipe(
      map((g) => ({
        id: String(g.id ?? ''),
        name: String(g.name ?? ''),
        description: g.description ?? '',
        address: g.address ?? '',
        kindofsport: Array.isArray(g.kindofsport) ? g.kindofsport : [],
        coverage: Array.isArray(g.coverage) ? g.coverage : [],
        geolocation: {
          lat: Number(g.geolocation?.lat ?? 0),
          lng: Number(g.geolocation?.lng ?? 0),
        },
        createdAt: g.createdAt,
        updatedAt: g.updatedAt,
        eventsCount: Number(g.eventsCount ?? 0),
        isFavorite: Boolean(g.isFavorite),
        avgRating: Number(g.avgRating ?? 0),
        avatar: g.avatar,
      })),
      catchError((err) => {
        console.warn(`GET /ground/${id} failed:`, err);
        return of(null);
      })
    );
  }

  createGround(dto: Partial<IGround>): Observable<IGround> {
    return this.http.post<IGround>(`${this.api}/ground`, dto).pipe(
      catchError((err) => {
        console.warn('POST /ground failed:', err);
        throw err;
      })
    );
  }

  updateGround(id: string, dto: Partial<IGround>): Observable<IGround> {
    return this.http.put<IGround>(`${this.api}/ground/${id}`, dto).pipe(
      catchError((err) => {
        console.warn(`PUT /ground/${id} failed:`, err);
        throw err;
      })
    );
  }

  deleteGround(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/ground/${id}`).pipe(
      catchError((err) => {
        console.warn(`DELETE /ground/${id} failed:`, err);
        throw err;
      })
    );
  }

  /* ========= избранное (локально) ========= */

  saveFavoriteGround(ground: IGround): void {
    const favorites = this.getFavoriteGrounds();
    if (!favorites.some((fav) => fav.id === ground.id)) {
      favorites.push(ground);
      localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
    }
  }

  deleteFavoriteGround(groundId: string): void {
    const favorites = this.getFavoriteGrounds();
    const updated = favorites.filter((fav) => fav.id !== groundId);
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(updated));
  }

  getFavoriteGrounds(): IGround[] {
    const stored = localStorage.getItem(this.FAVORITES_KEY);
    try {
      return stored ? (JSON.parse(stored) as IGround[]) : [];
    } catch (e) {
      console.warn('Failed to parse favorite grounds:', e);
      return [];
    }
  }
}
