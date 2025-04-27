import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IonCard,IonContent, IonCardContent, IonCardHeader, IonCardSubtitle,IonCardTitle } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { IEvent, IUser } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss'],
  imports: [CommonModule, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent]
})
export class EventViewComponent  implements OnInit, OnChanges{

  constructor() { }

  ngOnInit() {}

  @Input() event!: IEvent | null;
  @Input() user!: IUser | null ;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    if(changes['event']){
      this.event = changes['event'].currentValue;
    }
    if(changes['user']){
      this.user = changes['user'].currentValue;
    }
  }
}
