import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonIcon, IonContent } from '@ionic/angular/standalone';
import { MapComponent } from 'src/app/components/map/map.component';
import { PlaygroundsComponent } from 'src/app/components/playgrounds/playgrounds.component';
import { SearchComponent } from 'src/app/components/search/search.component';
import { IFavoriteListSport, IGround } from 'src/app/interfaces/interfaces';
import { add } from 'ionicons/icons';
import { addIcons } from 'ionicons';



@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss'],
  imports: [CommonModule,  IonIcon,IonButton, PlaygroundsComponent, SearchComponent, MapComponent, FormsModule, IonContent],

})
export class HomeViewComponent  implements OnInit {
  @Input() listfavoriteKindOfSport: IFavoriteListSport[]| null = null;
  @Input() listPlaygrounds: IGround[]| null = null;
  @Input() selectedKindOfSport: string| null = null;
  @Output() createEvent = new EventEmitter<Event>();
  constructor() { 
    addIcons({ add });
   }

  ngOnInit() {}

}
