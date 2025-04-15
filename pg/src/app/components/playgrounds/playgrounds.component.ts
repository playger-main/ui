import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel, IonList } from '@ionic/angular/standalone';
import { IGround } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-playgrounds',
  templateUrl: './playgrounds.component.html',
  styleUrls: ['./playgrounds.component.scss'],
  imports: [CommonModule,IonItem, IonLabel, IonList]
})
export class PlaygroundsComponent  implements OnInit {

  constructor() { }

  
  ngOnInit() {}

  @Input() listPlaygrounds: IGround[] | null = null;

  @Input() currentKindOfSport: string | null = null;
}
