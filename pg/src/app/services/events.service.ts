// ui/pg/src/app/services/events.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { ICreateEventDto, IEvent } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private readonly api = environment.apiUrl.replace(/\/+$/, '');

  constructor(private http: HttpClient) {}

  private normalizeEvent(raw: any): IEvent {
    return {
      id: String(raw?.id ?? ''),
      name: String(raw?.name ?? ''),
      description: String(raw?.description ?? ''),
      date: String(raw?.date ?? ''),
      startTime: String(raw?.startTime ?? ''),
      duration: String(raw?.duration ?? ''),
      createdAt: String(raw?.createdAt ?? ''),
      updatedAt: String(raw?.updatedAt ?? ''),
      creator: raw?.creator
        ? {
            id: String(raw.creator.id ?? ''),
            name: String(raw.creator.name ?? ''),
            role: Array.isArray(raw.creator.role) ? raw.creator.role : [],
          }
        : undefined,
      ground: raw?.ground
        ? {
            id: String(raw.ground.id ?? ''),
            name: String(raw.ground.name ?? ''),
            address: String(raw.ground.address ?? ''),
          }
        : undefined,
    };
  }

  /** GET /event */
  getEvents(): Observable<IEvent[]> {
    return this.http.get<any[]>(`${this.api}/event`).pipe(
      map((list) => (Array.isArray(list) ? list : []).map((e) => this.normalizeEvent(e))),
      catchError((err) => {
        console.warn('GET /event failed:', err);
        return of<IEvent[]>([]);
      })
    );
  }

  /** GET /event/:id */
  getEventById(id: string): Observable<IEvent | null> {
    return this.http.get<any>(`${this.api}/event/${id}`).pipe(
      map((e) => this.normalizeEvent(e)),
      catchError((err) => {
        console.warn(`GET /event/${id} failed:`, err);
        return of(null);
      })
    );
  }

  /** GET /event/ground/:groundId (optional jwt) */
  getEventsForGround(groundId: string): Observable<IEvent[]> {
    return this.http.get<any[]>(`${this.api}/event/ground/${groundId}`).pipe(
      map((list) => (Array.isArray(list) ? list : []).map((e) => this.normalizeEvent(e))),
      catchError((err) => {
        console.warn(`GET /event/ground/${groundId} failed:`, err);
        return of<IEvent[]>([]);
      })
    );
  }

  /** GET /event/mine?groundId=... */
  getMyEvents(groundId?: string): Observable<IEvent[]> {
    let params = new HttpParams();
    if (groundId) params = params.set('groundId', groundId);

    return this.http.get<any[]>(`${this.api}/event/mine`, { params }).pipe(
      map((list) => (Array.isArray(list) ? list : []).map((e) => this.normalizeEvent(e))),
      catchError((err) => {
        console.warn('GET /event/mine failed:', err);
        return of<IEvent[]>([]);
      })
    );
  }

  /** GET /event/ground/:groundId/mine */
  getMyEventsByGround(groundId: string): Observable<IEvent[]> {
    return this.http.get<any[]>(`${this.api}/event/ground/${groundId}/mine`).pipe(
      map((list) => (Array.isArray(list) ? list : []).map((e) => this.normalizeEvent(e))),
      catchError((err) => {
        console.warn(`GET /event/ground/${groundId}/mine failed:`, err);
        return of<IEvent[]>([]);
      })
    );
  }

  /** POST /event */
  createEvent(dto: ICreateEventDto): Observable<IEvent> {
    return this.http.post<any>(`${this.api}/event`, dto).pipe(
      map((e) => this.normalizeEvent(e)),
      catchError((err) => {
        console.warn('POST /event failed:', err);
        throw err;
      })
    );
  }
}
