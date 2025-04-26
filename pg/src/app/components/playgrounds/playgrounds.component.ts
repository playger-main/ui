import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel, IonList } from '@ionic/angular/standalone';
import { IGround } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-playgrounds',
  templateUrl: './playgrounds.component.html',
  styleUrls: ['./playgrounds.component.scss'],
  imports: [CommonModule,IonItem, IonLabel, IonList,  RouterModule, ]
})
export class PlaygroundsComponent  implements OnInit {

  constructor(private router: Router) { }

  
  ngOnInit() {}

  @Input() listPlaygrounds: IGround[] | null = null;

  @Input() currentKindOfSport: string | null = null;

  navigateToGround(id: string) {
    this.router.navigate(['/ground', id]);

  }
}
