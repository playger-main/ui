import { Component, Output, EventEmitter, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IonCard,IonContent, IonButton, IonIcon, IonCardContent, IonCardHeader, IonCardSubtitle,IonCardTitle } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { IEvent, IUser, IGround } from 'src/app/interfaces/interfaces';
import { accessibilityOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss'],
  imports: [CommonModule, IonButton, IonIcon, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent]
})
export class EventViewComponent  implements OnInit, OnChanges{

  constructor() { 
    addIcons({ accessibilityOutline });
  }

  ngOnInit() {}

  @Input() event!: IEvent | null;
  @Input() user!: IUser | null ;
  @Input() ground!: IGround | null ;

  @Output() onOrganizerClick = new EventEmitter<string>();
  @Output() onAttendClick = new EventEmitter<string>();
  @Output() onShareClick = new EventEmitter<string>();
  
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
