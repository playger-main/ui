import { Component } from '@angular/core';
import {
  IonContent,
  IonItem,
  IonList,
  IonMenu,
  IonTitle,
  IonToolbar,
  MenuController,
  IonIcon,
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  football,
  settingsOutline,
  cashOutline,
  chatbubbleOutline,
  notificationsOutline,
  gridOutline,
  balloonOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [IonItem, IonList, RouterModule, IonIcon],
})
export class MenuComponent {
  constructor(
    private menu: MenuController,
    private appComponent: AppComponent,
  ) {
    console.log('menu component');
    addIcons({
      homeOutline,
      chatbubbleOutline,
      cashOutline,
      football,
      settingsOutline,
      notificationsOutline,
      gridOutline,
      balloonOutline,
    });
  }
  handlerMenu(title: string) {
    this.menu.close();
    this.appComponent.setPageTitle(title);
  }
}
