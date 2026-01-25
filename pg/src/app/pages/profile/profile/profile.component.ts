// ui/pg/src/app/pages/profile/profile/profile.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileViewComponent } from '../profile-view/profile-view.component';

import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ICurrentUser, IEvent, IGround } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/services/user.service';
import { GroundService } from 'src/app/services/ground.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [ProfileViewComponent, CommonModule],
})
export class ProfileComponent implements OnInit {
  constructor(
    private eventService: EventsService,
    private userService: UserService,
    private groundService: GroundService
  ) {}

  user$!: Observable<ICurrentUser | null>;
  favoriteGrounds$!: Observable<IGround[]>;
  futureEvents$!: Observable<IEvent[]>;

  ngOnInit() {
    this.user$ = this.userService.getMe();

    const favoriteIds = (this.groundService.getFavoriteGrounds() ?? [])
      .map((g) => g?.id)
      .filter((id): id is string => Boolean(id));

    this.favoriteGrounds$ = favoriteIds.length
      ? forkJoin(favoriteIds.map((id) => this.groundService.getGroundById(id))).pipe(
          map((list) => (list ?? []).filter((g): g is IGround => Boolean(g?.id))),
          catchError((err) => {
            console.warn('Load favorite grounds failed:', err);
            return of<IGround[]>([]);
          })
        )
      : of<IGround[]>([]);

    this.futureEvents$ = this.eventService.getMyEvents().pipe(
      map((list) => {
        const now = new Date();
        return (list ?? []).filter((e) => {
          const d = new Date(e.date);
          return !isNaN(d.getTime()) && d >= now;
        });
      }),
      catchError((err) => {
        console.warn('Load my events failed:', err);
        return of<IEvent[]>([]);
      })
    );
  }
}
