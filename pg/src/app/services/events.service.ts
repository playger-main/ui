// pg/src/app/services/events.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { EVENTS_MOCK } from '../mock';
import { IEvent } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private apiUrl = 'https://your-api-url.com/api/events'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Get all events
  getEvents(): Observable<IEvent[]> {
    return of(EVENTS_MOCK);
    // return this.http.get<Event[]>(this.apiUrl);
  }

  // Get a special event by ID
  getEventById(id: string): Observable<IEvent> {
    return of(EVENTS_MOCK.find(event => event.id === id) as IEvent);
    // return this.http.get<Event>(`${this.apiUrl}/${id}`);
  }
}