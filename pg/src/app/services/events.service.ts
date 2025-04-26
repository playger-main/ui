// pg/src/app/services/events.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { EVENTS_MOCK } from '../mock';

export interface Event {
  id: string;
  name: string;
  date: string;
  // Add other event properties as needed
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private apiUrl = 'https://your-api-url.com/api/events'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Get all events
  getEvents(): Observable<Event[]> {
    return of(EVENTS_MOCK);
    // return this.http.get<Event[]>(this.apiUrl);
  }

  // Get a special event by ID
  getEventById(id: string): Observable<Event> {
    return of(EVENTS_MOCK.find(event => event.id === id) as Event);
    // return this.http.get<Event>(`${this.apiUrl}/${id}`);
  }
}