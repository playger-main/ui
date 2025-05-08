import { Component, inject, OnInit } from '@angular/core';
import { GroundViewComponent } from '../ground-view/ground-view.component';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, tap, map } from 'rxjs';
import { IEvent, IGround } from 'src/app/interfaces/interfaces';
import {  fakeGrounds } from 'src/app/mock';
import { CommonModule } from '@angular/common';
import { EventsService } from 'src/app/services/events.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-ground',
  templateUrl: './ground.component.html',
  styleUrls: ['./ground.component.scss'],
  imports:[CommonModule, GroundViewComponent]
})
export class GroundComponent  implements OnInit {

  constructor(private eventsService: EventsService, private router: Router) { }

  private route = inject(ActivatedRoute);
  groundId!: string;

  ground$!: Observable<IGround>;

  eventsForGround$!: Observable<IEvent[]>;

  ngOnInit(): void {
    console.log(this.groundId)
    this.groundId = this.route.snapshot.paramMap.get('id')!;
    this.loadDataChosenGround(this.groundId);
  }

  loadDataChosenGround (id: string) {
    return this.ground$ = of(fakeGrounds.find(ground => ground.id === id)!).pipe(tap(ground => {
      this.loadEventsForGround(ground.id);
    }));
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

  }
  

