import { DatePipe, CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonListHeader,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonCardHeader,
  IonCard,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { IEvent } from 'src/app/interfaces/interfaces';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-my-events-view',
  templateUrl: './my-events-view.component.html',
  styleUrls: ['./my-events-view.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonListHeader,
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

  allEvents: IEvent[] = [];
  upcomingEvents: IEvent[] = [];
  pastEvents: IEvent[] = [];

  private router = inject(Router);
  private eventsService = inject(EventsService);

  ngOnInit() {
    // ✅ "мои события" — строго /event/mine (требуется токен)
    this.eventsService.getMyEvents().subscribe((events) => {
      this.allEvents = Array.isArray(events) ? events : [];
      this.splitEvents();
    });
  }

  private splitEvents() {
    const now = new Date();

    const isUpcoming = (ev: IEvent) => {
      const d = new Date(ev.date); // "2025-10-12"
      return !isNaN(d.getTime()) && d >= now;
    };

    this.upcomingEvents = this.allEvents.filter(isUpcoming);
    this.pastEvents = this.allEvents.filter((ev) => !isUpcoming(ev));
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value as 'going' | 'went';
  }

  goToCurrentEventPage(id: string) {
    this.router.navigate(['/event', id]);
  }
}
