import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { HeaderComponent } from './core/header/header.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MenuComponent } from './components/menu/menu.component';
import { FooterMenuComponent } from './components/footer-menu/footer-menu.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, MenuComponent, FooterMenuComponent, HeaderComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ], 
})
export class AppComponent {
  pageTitle: string = 'Home';

  setPageTitle(title: string) {
    this.pageTitle = title;
  }  
}