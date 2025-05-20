import { Component, OnInit } from '@angular/core';
import { ProfileViewComponent } from '../profile-view/profile-view.component';
import { map, Observable, of, tap, switchMap, forkJoin, ObservableInputTuple } from 'rxjs';
import { ICurrentUser, IEvent, IGround, IUser } from 'src/app/interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CommonModule } from '@angular/common';
import { GroundService } from 'src/app/services/ground.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [ProfileViewComponent, CommonModule]
})
export class ProfileComponent  implements OnInit {

  constructor(private route: ActivatedRoute, private eventService: EventsService, private userService: UserService, private groundService: GroundService) { }

  ngOnInit() {
    const id = '1';
  
    this.user$ = this.getCurrentUser(id);
  
    const loadedData$ = this.user$.pipe(
      switchMap(user => {
        const groundIds = user.favoriteGroundIds ?? [];
        const eventIds = user.listFutureEvents ?? [];
        console.log(eventIds)
  
        const groundRequests = groundIds.map(id => this.groundService.getGroundById(id));
        const eventRequests = eventIds.map(id => this.eventService.getEventById(id));

  
        return forkJoin({
          favoriteGrounds: groundRequests.length ? forkJoin(groundRequests) : of([]),
          futureEvents: eventRequests.length ? forkJoin(eventRequests) : of([])
        }).pipe(
          map(({ favoriteGrounds, futureEvents }) => ({
            favoriteGrounds,
            futureEvents: futureEvents.filter(e => new Date(e.date) > new Date())
          }))
        );
      })
    );
  
    // Assign the individual streams for use with `async` in template
    this.favoriteGrounds$ = loadedData$.pipe(map(data => data.favoriteGrounds));
    this.futureEvents$ = loadedData$.pipe(map(data => data.futureEvents));
  }
  

  user$!: Observable<ICurrentUser>;

  favoriteGrounds$!: Observable<IGround[]>;

  futureEvents$!: Observable<IEvent[]>;

  getCurrentUser(id: string): Observable<ICurrentUser> {
    return this.userService.getCurrentUser(id);
   }

}
