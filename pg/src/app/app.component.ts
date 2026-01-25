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
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';

import { IGround } from 'src/app/interfaces/interfaces';
import { GroundService } from 'src/app/services/ground.service';

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
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
})
export class AppComponent {
  constructor(private playGroundService: GroundService) {}

  currentUrl = '';
  pageTitle = 'PG';

  // теперь список площадок получаем только с сервера
  listPlaygrounds$!: Observable<IGround[]>;

  selectedKindOfSport = 'football'; // дефолт, чтобы не зависеть от mock

  isHomePage = false;

  ngOnInit(): void {
    // задаём дефолтный вид спорта и грузим
    this.playGroundService.setSelectedGround(this.selectedKindOfSport);
    this.listPlaygrounds$ = this.playGroundService
      .getListOfGroundsForChosenSport()
      .pipe(map((data) => data ?? []));
  }

  setPageTitle(title: string) {
    this.pageTitle = title;
  }

  onMenuClosed() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }
}
