import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {  IonContent, IonModal, IonSegment, IonSegmentButton, IonItem, IonLabel, IonList, IonToggle, Gesture, GestureController, IonIcon, IonTabButton, IonTabBar, IonTabs } from '@ionic/angular/standalone';
import { map, Observable, Subscription } from 'rxjs';
import { FavouriteObjectsComponent } from 'src/app/components/favourite-objects/favourite-objects.component';
import { MapComponent } from 'src/app/components/map/map.component';
import { PlaygroundsComponent } from 'src/app/components/playgrounds/playgrounds.component';
import { SearchComponent } from 'src/app/components/search/search.component';
import { IFavoriteListSport, IGround } from 'src/app/interfaces/interfaces';
import { GroundService } from 'src/app/services/ground.service';
import { UserService } from 'src/app/services/user.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter, of } from 'rxjs';
import {ChangeDetectionStrategy } from '@angular/core';
import { AppComponent } from 'src/app/app.component';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, MapComponent, FormsModule, IonContent],
})
export class HomePage implements OnInit {
constructor(public appComponent: AppComponent,private userService: UserService, private playGroundService: GroundService, private router: Router) { }

ngOnInit(): void {
  

this.loadUserData();
  this.loadUserData();
}
isHomePage = false;
routerSubscription!: Subscription;

ionViewWillEnter(): void {
  // This triggers every time you ENTER the Home page
  this.checkIfHomePage();
  this.loadUserData();
}



listfavoriteKindOfSport$!: Observable<IFavoriteListSport[]>;

listPlaygrounds$!: Observable<IGround[]>;

selectedKindOfSport: string = '';

private loadUserData () {

 this.listfavoriteKindOfSport$ =  this.userService.getListOfFavKindSport().pipe(map((data)=> {
  this.playGroundService.setSelectedGround(data[0].type.toLowerCase());
  this.selectedKindOfSport = data[0].type.toLowerCase();

  this.listPlaygrounds$ = this.playGroundService.getListOfGroundsForChosenSport().pipe(map((data)=> data));
  return data;
 }));


}

chooseKindOfSport (sport: string) {
   this.playGroundService.setSelectedGround(sport);
   this.listPlaygrounds$ = this.playGroundService.getListOfGroundsForChosenSport().pipe(map((data)=> data));

}

private checkIfHomePage() {
  const url = this.router.url;
  console.log(url);
  this.isHomePage = url === '/home';
}
ngOnDestroy() {
  if (this.routerSubscription) {
    this.routerSubscription.unsubscribe();
  }
}
}
