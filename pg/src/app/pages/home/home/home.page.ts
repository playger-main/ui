import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
import { HomeViewComponent } from '../home-view/home-view.component';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, HomeViewComponent   ],
})
export class HomePage implements OnInit {
constructor(public appComponent: AppComponent,private userService: UserService, private playGroundService: GroundService, private router: Router) { 
  addIcons({ add });
}

ngOnInit(): void {
this.loadUserData();
}



ionViewWillEnter(): void {
  // This triggers every time you ENTER the Home page

  this.loadUserData();
}

listfavoriteKindOfSport$!: Observable<IFavoriteListSport[]>;

listPlaygrounds$!: Observable<IGround[]>;


private loadUserData () {

 this.listfavoriteKindOfSport$ =  this.userService.getListOfFavKindSport().pipe(map((data)=> {
  this.playGroundService.setSelectedGround(data[0].type.toLowerCase());

  this.listPlaygrounds$ = this.playGroundService.getListOfGroundsForChosenSport().pipe(map((data)=> data));

  return data;
 }));
}

chooseKindOfSport (sport: string) {
   this.playGroundService.setSelectedGround(sport);
   this.listPlaygrounds$ = this.playGroundService.getListOfGroundsForChosenSport().pipe(map((data)=> data));

}

onNewGroundForm (ground: IGround) {
  console.log(ground);
}
}
