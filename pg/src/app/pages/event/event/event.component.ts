import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IEvent } from 'src/app/interfaces/interfaces';
import { EventsService } from 'src/app/services/events.service';
import { EventViewComponent } from '../event-view/event-view.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  standalone: true,
  imports: [CommonModule, EventViewComponent],
})
export class EventComponent implements OnInit {
  event$!: Observable<IEvent | null>;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private eventsService = inject(EventsService);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/error']);
      return;
    }

    this.event$ = this.eventsService.getEventById(id).pipe(
      catchError(() => of(null))
    );
  }

  onOrganizerClick(userId: string) {
    this.router.navigate(['/user', userId]);
  }
}
