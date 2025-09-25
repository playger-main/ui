// pg/src/app/services/events.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { EVENTS_MOCK } from '../mock';
import { IEvent } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private apiUrl = environment.apiUrl; 

  constructor(private http: HttpClient) {}

  // Get all events
  getEvents(): Observable<IEvent[]> {
    return of(EVENTS_MOCK);
    // return this.http.get<Event[]>(this.apiUrl);
  }

  // Get a special event by ID
  getEventById(id: string): Observable<IEvent> {
    return of(EVENTS_MOCK.find((event) => event.id === id) as IEvent);
    // return this.http.get<Event>(`${this.apiUrl}/${id}`);
  }

  getUserEvents(id: string): Observable<IEvent[]> {
    return of(EVENTS_MOCK.filter((event) => event.id === id) as IEvent[]);
    // return this.http.get<Event>(`${this.apiUrl}/${id}`);
  }

  getEventsForGround(groundId: string): Observable<IEvent[]> {
    return of(
      EVENTS_MOCK.filter((event) => event.groundId === groundId) as IEvent[]
    );
  }

  createEvent(event: IEvent) {
    console.log('Creating event:', event);
    // здесь можно отправить HTTP POST на backend
    return of(event);
  }
}
