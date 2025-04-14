import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  IonContent, IonModal, IonSegment, IonSegmentButton, IonItem, IonLabel, IonList, IonToggle, Gesture, GestureController, IonIcon, IonTabButton, IonTabBar, IonTabs } from '@ionic/angular/standalone';
import { map, Observable } from 'rxjs';
import { DropDownPanelComponent } from 'src/app/components/drop-down-panel/drop-down-panel.component';
import { FavouriteObjectsComponent } from 'src/app/components/favourite-objects/favourite-objects.component';
import { MapComponent } from 'src/app/components/map/map.component';
import { SearchComponent } from 'src/app/components/search/search.component';
import { IFavoriteListSport } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, MapComponent, FormsModule, DropDownPanelComponent, IonContent, FavouriteObjectsComponent, SearchComponent],
})
export class HomePage implements OnInit {
constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.loadUserData();
  }

listfavoriteKindOfSport$!: Observable<IFavoriteListSport[]>;


private loadUserData () {
 this.listfavoriteKindOfSport$ =  this.userService.getListOfFavKindSport().pipe(map((data)=> data));
}
  

}
