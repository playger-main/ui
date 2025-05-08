import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { IEvent, IGround } from 'src/app/interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { IonCardContent,IonButton, IonCard, IonList, IonIcon, IonItem, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonLabel } from '@ionic/angular/standalone';
import { star , starOutline} from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-ground-view',
  templateUrl: './ground-view.component.html',
  styleUrls: ['./ground-view.component.scss'],
  imports: [CommonModule, IonButton, IonIcon,IonList, IonLabel, IonItem, IonCard, IonContent, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle]
})
export class GroundViewComponent  implements OnInit, OnChanges {

  constructor() {
    addIcons({ star, starOutline });

   }

   showFeedback = false;
   showEvents = false;

  @Input() ground!: IGround | null;
  @Input() eventsForGround!: IEvent[] | null;

  @Output() eventClicked = new EventEmitter<string>();


  ngOnInit() {
    console.log(this.ground)
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['ground']){
      this.ground = changes['ground'].currentValue;
      console.log(this.ground)
    }
  }
 

  toggleFeedback() {
    this.showFeedback = !this.showFeedback;
  }

  toggleEvents() {
    this.showEvents = !this.showEvents;
  }

}

