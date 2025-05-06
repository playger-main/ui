import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IEvent } from 'src/app/interfaces/interfaces';
import { IonCard,IonIcon,IonHeader, IonToolbar, IonButtons, IonTitle, IonButton, IonContent, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { add } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-events-view',
  templateUrl: './events-view.component.html',
  styleUrls: ['./events-view.component.scss'],
  imports: [CommonModule, IonIcon, IonButton,IonCard, IonContent, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList],

})
export class EventsViewComponent  implements OnInit {

  constructor() {
    addIcons({ add });
   }

  ngOnInit() {}

  @Input()  listEvents!: IEvent[] | null;
  @Output() goToCurrentEventPage = new EventEmitter<string>()
  @Output() createEvent = new EventEmitter<any>();

 
}
