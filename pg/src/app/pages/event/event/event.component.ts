import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit } from '@angular/core';
import { EventViewComponent } from '../event-view/event-view.component';
import { ActivatedRoute } from '@angular/router';
import { IEvent, IUser, IGround } from 'src/app/interfaces/interfaces';
import { EVENTS_MOCK } from 'src/app/mock';
import { map, Observable, switchMap , of, catchError, throwError, tap} from 'rxjs';
import { EventsService } from 'src/app/services/events.service';
import { UserService } from 'src/app/services/user.service';
import { GroundService } from 'src/app/services/ground.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  imports:[CommonModule, EventViewComponent]
})
export class EventComponent  implements OnInit {

  event$!: Observable<IEvent>;
  user$!: Observable<IUser>;
  ground$!: Observable<IGround | null>;

  constructor(private route: ActivatedRoute, private eventService: EventsService, private groundService: GroundService, private userService: UserService, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
  
    if (id) {
      this.event$ = this.getEventById(id).pipe(
        switchMap(ev => {
          const ground$ = ev.groundId
            ? this.groundService.getGroundById(ev.groundId)
            : of(null);
  
          const user$ = this.getUserById(ev.userId);
  
          // save to component properties if needed
          this.ground$ = ground$;
          this.user$ = user$;
  
          return of(ev); // pass event as main observable
        })
      );
    }
  }


  getEventById(id: string): Observable<IEvent> {
    return this.eventService.getEventById(id).pipe(
      tap(event => {
        if (!event) {
          this.router.navigate(['/error']);
        }
      }),
      catchError(err => {
        this.router.navigate(['/error']);
        return throwError(() => err);
      })
    );
  }

  getUserById(id: string): Observable<IUser> {
   return this.userService.getUserById(id);
  }

  onOrganizerClick(id: string) {
    this.router.navigate(['/user', id]);
  }

  onAttendClick(eventId: string){
    console.log(eventId);
    console.log('I will attend clicked for event:');

  }

  onShareClick(eventId: string){
    console.log('Share Event clicked for event:', eventId);

  }
}

