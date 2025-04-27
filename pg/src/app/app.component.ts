import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { HeaderComponent } from './core/header/header.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MenuComponent } from './components/menu/menu.component';
import { FooterMenuComponent } from './components/footer-menu/footer-menu.component';
import { Router, NavigationEnd } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { DropDownPanelComponent } from 'src/app/components/drop-down-panel/drop-down-panel.component';
import { SearchComponent } from './components/search/search.component';
import { FavouriteObjectsComponent } from './components/favourite-objects/favourite-objects.component';
import { PlaygroundsComponent } from './components/playgrounds/playgrounds.component';
import { map, Observable, Subscription } from 'rxjs';
import { IFavoriteListSport, IGround } from 'src/app/interfaces/interfaces';
import { GroundService } from 'src/app/services/ground.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [CommonModule, PlaygroundsComponent, IonApp, FavouriteObjectsComponent, SearchComponent, DropDownPanelComponent, FooterMenuComponent, IonRouterOutlet, MenuComponent, HeaderComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ], 
})
export class AppComponent {

  constructor( private router: Router, private playGroundService: GroundService, private userService: UserService) { 
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;
        this.isHomePage = url === '/home' ? true : false;
        console.log('Current URL:', url, 'isHomePage:', this.isHomePage);
      });
  
  }
  
  currentUrl = '';
  pageTitle: string = 'PG';
  listfavoriteKindOfSport$!: Observable<IFavoriteListSport[]>;

  listPlaygrounds$!: Observable<IGround[]>;
  
  selectedKindOfSport: string = '';

  isHomePage = false;

  ngOnInit(): void {
    
      this.loadUserData();
  }

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

  


  setPageTitle(title: string) {
    this.pageTitle = title;
  }  
}