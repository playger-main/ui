import { Component } from '@angular/core';
import { IonContent, IonItem, IonList, IonMenu, IonTitle, IonToolbar, MenuController } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [IonItem, IonList, IonContent, IonMenu, IonTitle, IonToolbar, RouterModule ]
})
export class MenuComponent {
  constructor(private menu: MenuController, private appComponent: AppComponent) {}
  handlerMenu(title: string) {
    this.menu.close();
    this.appComponent.setPageTitle(title);    
  }  
}
