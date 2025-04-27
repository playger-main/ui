import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { IGround } from 'src/app/interfaces/interfaces';
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
  @Input() ground!: IGround | null;
  ngOnInit() {
    console.log(this.ground)
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['ground']){
      this.ground = changes['ground'].currentValue;
      console.log(this.ground)
    }
  }
  showFeedback = false;

  toggleFeedback() {
    this.showFeedback = !this.showFeedback;
  }

}

