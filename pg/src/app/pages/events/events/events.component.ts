import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IEvent } from 'src/app/interfaces/interfaces';
import { EVENTS_MOCK} from 'src/app/mock';
import { EventsViewComponent } from '../events-view/events-view.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  imports: [CommonModule, EventsViewComponent]

})
export class EventsComponent  implements OnInit {

  listEvents$!: Observable<IEvent[]>;



  constructor(private router: Router) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents(): Observable<IEvent[]> {
    return this.listEvents$ = of(EVENTS_MOCK);
    
  }

  getEventById(id: string): Observable<IEvent | undefined> {
    return of(EVENTS_MOCK.find(event => event.id === id));
  }

  goToCurrentEventPage(id: string){
    this.router.navigate(['/event', id]);  }

}
