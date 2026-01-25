import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { EventsService } from 'src/app/services/events.service';
import { UserService } from 'src/app/services/user.service';
import { ICreateEventDto, ICurrentUser, IEvent } from 'src/app/interfaces/interfaces';
import { EventsViewComponent } from '../events-view/events-view.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  standalone: true,
  imports: [CommonModule, EventsViewComponent],
})
export class EventsComponent implements OnInit {
  listEvents$!: Observable<IEvent[]>;
  currentUser$!: Observable<ICurrentUser | null>;

  private router = inject(Router);
  private eventsService = inject(EventsService);
  private userService = inject(UserService);

  ngOnInit() {
    this.currentUser$ = this.userService.getCurrentUser();
    this.reload();
  }

  private reload() {
    this.listEvents$ = this.eventsService.getEvents();
  }

  goToCurrentEventPage(id: string) {
    this.router.navigate(['/event', id]);
  }

  onNewEventForm(dto: ICreateEventDto) {
    this.eventsService.createEvent(dto).subscribe({
      next: () => this.reload(),
      error: (err) => {
        if (err?.status === 403) alert('Only trainer/admin can create events.');
        else alert('Failed to create event.');
      },
    });
  }
}
