import { Component } from '@angular/core';
import {
  IonApp,
  IonContent,
  IonMenu,
  IonRouterOutlet,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { HeaderComponent } from './core/header/header.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MenuComponent } from './components/menu/menu.component';
import { FooterMenuComponent } from './components/footer-menu/footer-menu.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import { IFavoriteListSport, IGround } from 'src/app/interfaces/interfaces';
import { GroundService } from 'src/app/services/ground.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    CommonModule,
    IonContent,
    IonMenu,
    IonApp,
    FooterMenuComponent,
    IonRouterOutlet,
    MenuComponent,
    HeaderComponent,
    IonHeader,
    IonTitle,
    IonToolbar,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class AppComponent {
  constructor(
    private playGroundService: GroundService,
    private userService: UserService,
  ) {}

  currentUrl = '';
  pageTitle: string = 'PG';
  listfavoriteKindOfSport$!: Observable<IFavoriteListSport[]>;

  listPlaygrounds$!: Observable<IGround[]>;

  selectedKindOfSport: string = '';

  isHomePage = false;

  ngOnInit(): void {
    this.loadUserData();
  }

  private loadUserData() {
    this.listfavoriteKindOfSport$ = this.userService
      .getListOfFavKindSport()
      .pipe(
        map((data) => {
          this.playGroundService.setSelectedGround(data[0].type.toLowerCase());
          this.selectedKindOfSport = data[0].type.toLowerCase();

          this.listPlaygrounds$ = this.playGroundService
            .getListOfGroundsForChosenSport()
            .pipe(map((data) => data));
          return data;
        }),
      );
  }

  setPageTitle(title: string) {
    this.pageTitle = title;
  }

  onMenuClosed() {
    if (document.activeElement instanceof HTMLElement) {
      console.log(document.activeElement);
      document.activeElement.blur();
    }
  }
}
