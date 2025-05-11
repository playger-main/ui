import { Component, inject, OnInit } from '@angular/core';
import { GroundViewComponent } from '../ground-view/ground-view.component';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, catchError, throwError,tap, map } from 'rxjs';
import { IEvent, IGround } from 'src/app/interfaces/interfaces';
import {  fakeGrounds } from 'src/app/mock';
import { CommonModule } from '@angular/common';
import { EventsService } from 'src/app/services/events.service';
import { Router } from '@angular/router';
import { GroundService } from 'src/app/services/ground.service';


@Component({
  selector: 'app-ground',
  templateUrl: './ground.component.html',
  styleUrls: ['./ground.component.scss'],
  imports:[CommonModule, GroundViewComponent]
})
export class GroundComponent  implements OnInit {

  constructor(private eventsService: EventsService, private router: Router, private groundService: GroundService) { }

  private route = inject(ActivatedRoute);

  groundId!: string | null;

  ground$!: Observable<IGround | null>;

  eventsForGround$!: Observable<IEvent[] | null>;

  ngOnInit(): void {
 
     this.groundId = this.route.snapshot.paramMap.get('id')!;
     console.log(this.groundId);
    
  this.loadDataChosenGround(this.groundId);
}


  

loadDataChosenGround(id: string) {
  const ground = fakeGrounds.find(g => g.id === id) || null;

  if (ground) {
    this.loadEventsForGround(ground.id);
    this.ground$ = of(ground);
  } else {
    this.router.navigate(['/error']);
    // ⚠️ Do NOT assign this.ground$ if you're navigating immediately
  }
}

  

  loadEventsForGround(groundId: string) {
    console.log(groundId)
    this.eventsService.getEventsForGround(groundId).subscribe(events => {
      this.eventsForGround$ = of(events);
    });
  }

  eventClicked (eventId: string) {
    console.log(eventId);
    this.router.navigate(['/event', eventId]);  }

  addToFavorites(ground: IGround) {
    console.log('Added to favorites:', ground);
    this.groundService.saveFavoriteGround(ground)
  }

  removeFromFavorites(ground: IGround): void {
    this.groundService.deleteFavoriteGround(ground.id);
  }

  isGroundInFavorites(): boolean {
    return this.groundService.getFavoriteGrounds().some(f => f.id === this.groundId);
  }
  

}