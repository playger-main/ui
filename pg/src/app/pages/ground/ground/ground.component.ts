// ui/pg/src/app/pages/ground/ground/ground.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IEvent, IGround } from 'src/app/interfaces/interfaces';
import { EventsService } from 'src/app/services/events.service';
import { GroundService } from 'src/app/services/ground.service';
import { GroundViewComponent } from '../ground-view/ground-view.component';

@Component({
  selector: 'app-ground',
  templateUrl: './ground.component.html',
  styleUrls: ['./ground.component.scss'],
  standalone: true,
  imports: [CommonModule, GroundViewComponent],
})
export class GroundComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  groundId!: string;

  ground$!: Observable<IGround | null>;
  eventsForGround$!: Observable<IEvent[]>;

  constructor(
    private eventsService: EventsService,
    private groundService: GroundService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/error']);
      return;
    }
    this.groundId = id;

    this.ground$ = this.groundService.getGroundById(id).pipe(
      catchError(() => of(null))
    );

    this.eventsForGround$ = this.eventsService.getEventsForGround(id).pipe(
      catchError(() => of([]))
    );
  }

  eventClicked(eventId: string) {
    this.router.navigate(['/event', eventId]);
  }

  addToFavorites(ground: IGround) {
    this.groundService.saveFavoriteGround(ground);
  }

  removeFromFavorites(ground: IGround): void {
    this.groundService.deleteFavoriteGround(ground.id);
  }

  isGroundInFavorites(): boolean {
    return this.groundService.getFavoriteGrounds().some((f) => f.id === this.groundId);
  }
}
