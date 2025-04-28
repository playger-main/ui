import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonButton, IonIcon, IonContent, IonCard, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { map, Observable, Subscription } from 'rxjs';
import { FavouriteObjectsComponent } from 'src/app/components/favourite-objects/favourite-objects.component';
import { MapComponent } from 'src/app/components/map/map.component';
import { PlaygroundsComponent } from 'src/app/components/playgrounds/playgrounds.component';
import { SearchComponent } from 'src/app/components/search/search.component';
import { IFavoriteListSport, IGround } from 'src/app/interfaces/interfaces';
import { GroundService } from 'src/app/services/ground.service';
import { UserService } from 'src/app/services/user.service';
import { Router, NavigationEnd } from '@angular/router';
import { add } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AppComponent } from 'src/app/app.component';
import { DropDownPanelComponent } from 'src/app/components/drop-down-panel/drop-down-panel.component';



@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss'],
  imports: [CommonModule,  IonIcon,IonButton,IonCard, IonCardHeader, IonCardTitle, PlaygroundsComponent, SearchComponent, MapComponent, FormsModule, IonContent],

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
