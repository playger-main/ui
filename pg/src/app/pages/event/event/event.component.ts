import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit } from '@angular/core';
import { EventViewComponent } from '../event-view/event-view.component';
import { ActivatedRoute } from '@angular/router';
import { IEvent, IUser } from 'src/app/interfaces/interfaces';
import { EVENTS_MOCK } from 'src/app/mock';
import { map, Observable, switchMap , of} from 'rxjs';
import { EventsService } from 'src/app/services/events.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  imports:[CommonModule, EventViewComponent]
})
export class EventComponent  implements OnInit {

  event$!: Observable<IEvent>;
  user$!: Observable<IUser>;

  constructor(private route: ActivatedRoute, private eventService: EventsService, private userService: UserService) {}

  ngOnInit() {


    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.event$ =  this.getEventById(id).pipe(
        switchMap((ev)=> {
          console.log(ev);
          this.user$ = this.getUserById(ev.userId).pipe(map(data=> data));
          return of(ev);
        })
      );
    }
  }


  getEventById(id: string): Observable<IEvent> {
    return this.eventService.getEventById(id);
  }

  getUserById(id: string): Observable<IUser> {
   return this.userService.getUserById(id);
  }
}

