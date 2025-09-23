import { Component, inject, OnInit } from '@angular/core';
import {
  IonButton,
  IonIcon,
  IonModal,
  IonContent,
  ActionSheetController,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonSegmentContent,
  IonSegmentView,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonCardHeader,
  IonCard,
} from '@ionic/angular/standalone';
import { IEvent } from 'src/app/interfaces/interfaces';
import { DatePipe, NgIf, NgFor } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-my-events-view',
  templateUrl: './my-events-view.component.html',
  styleUrls: ['./my-events-view.component.scss'],
  imports: [
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonLabel,

    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    DatePipe,
  ],
})
export class MyEventsViewComponent implements OnInit {
  selectedSegment: 'going' | 'went' = 'going';

  allEvents: IEvent[] = []; // load from service or mock data
  upcomingEvents: IEvent[] = [];
  pastEvents: IEvent[] = [];

  private router = inject(Router);

  ngOnInit() {
    // Example mock events
    this.allEvents = [
      {
        id: '1',
        name: 'Football Match',
        description: 'Friendly football game at the local ground.',
        date: '2025-09-25',
        startTime: '18:00',
        duration: 120,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: 'user123',
        location: { lat: '11', lng: '111', address: 'Main St, 54' },
        category: 'Sports',
        maxPeople: 22,
        requestCount: 10,
      },
      {
        id: '2',
        name: 'Basketball Tournament',
        description: 'Regional basketball tournament finals.',
        date: '2025-08-15',
        startTime: '15:00',
        duration: 180,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: 'user123',
        location: { lat: '11', lng: '111', address: 'Main St, 54' },
        category: 'Sports',
        maxPeople: 50,
        requestCount: 30,
      },
    ];

    this.splitEvents();
  }

  private splitEvents() {
    const now = new Date();
    this.upcomingEvents = this.allEvents.filter(
      (ev) => new Date(ev.date) >= now,
    );
    this.pastEvents = this.allEvents.filter((ev) => new Date(ev.date) < now);
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  goToCurrentEventPage(id: string) {
    this.router.navigate(['/event', id]);
  }
}
