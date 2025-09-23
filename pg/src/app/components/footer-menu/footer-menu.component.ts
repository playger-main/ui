import { Component } from '@angular/core';
import {
  IonTabs,
  IonTabBar,
  IonRouterOutlet,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonNav,
  NavController,
  IonButton,
  IonButtons,
  IonToolbar,
  IonContent,
  IonTitle,
  IonHeader,
  IonTab,
} from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { person, home, calendarOutline, golf } from 'ionicons/icons';
import { AppComponent } from 'src/app/app.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer-menu',
  templateUrl: 'footer-menu.component.html',
  styleUrls: ['footer-menu.component.scss'],
  imports: [
    CommonModule,
    IonRouterOutlet,
    IonContent,
    IonIcon,
    IonTabButton,
    IonTabBar,
    IonTabs,
  ],
})
export class FooterMenuComponent {
  constructor(private appComponent: AppComponent) {
    addIcons({ person, home, golf, calendarOutline });
  }
  currentTitle = '';

  handlerTabs(title: string) {
    this.appComponent.setPageTitle(title);
  }
}
