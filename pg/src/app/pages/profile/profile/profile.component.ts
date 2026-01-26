import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileViewComponent } from '../profile-view/profile-view.component';

import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';

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

  ngOnInit(): void {
    this.user$ = this.userService.getMe().pipe(
      catchError((err) => {
        console.warn('Load me failed:', err);
        return of(null);
      }),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    // ✅ избранные уже приходят как IGround[] с /favorite
    this.favoriteGrounds$ = this.groundService.getFavoriteGrounds().pipe(
      map((list: IGround[]) => (list ?? []).filter((g: IGround) => Boolean(g?.id))),
      catchError((err) => {
        console.warn('Load favorite grounds failed:', err);
        return of<IGround[]>([]);
      }),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    this.futureEvents$ = this.eventService.getMyEvents().pipe(
      map((list: IEvent[] | null | undefined) => {
        const now = new Date();
        return (list ?? []).filter((e: IEvent) => {
          const d = new Date(e.date);
          return !isNaN(d.getTime()) && d >= now;
        });
      }),
      catchError((err) => {
        console.warn('Load my events failed:', err);
        return of<IEvent[]>([]);
      }),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }
}
