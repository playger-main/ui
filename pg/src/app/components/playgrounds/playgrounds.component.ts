import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonCard, IonAvatar, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonItem, IonLabel, IonList } from '@ionic/angular/standalone';
import { IGround } from 'src/app/interfaces/interfaces';
import { star ,heart, calendar, starOutline, locationOutline} from 'ionicons/icons';
import { addIcons } from 'ionicons';
@Component({
  selector: 'app-playgrounds',
  templateUrl: './playgrounds.component.html',
  styleUrls: ['./playgrounds.component.scss'],
  imports: [CommonModule, IonIcon, IonList,  RouterModule, ]
})
export class PlaygroundsComponent  implements OnInit {

  constructor(private router: Router) {
    addIcons({ heart,star, calendar, starOutline, locationOutline });
   }

  
  ngOnInit() {
    console.log('playgrounds component')
  }

  Math = Math;

  @Input() listPlaygrounds: IGround[] | null = null;

  @Input() currentKindOfSport: string | null = null;

  navigateToGround(id: string) {
    this.router.navigate(['/ground', id]);

  }
}
