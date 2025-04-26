import { Component, OnInit, Input } from '@angular/core';
import { IEvent } from 'src/app/interfaces/interfaces';
import { IonCard, IonContent, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-events-view',
  templateUrl: './events-view.component.html',
  styleUrls: ['./events-view.component.scss'],
  imports: [CommonModule, IonCard, IonContent, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList],

})
export class EventsViewComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  @Input()  listEvents!: IEvent[] | null;

}
