import { Component } from '@angular/core';
import { IonContent, IonItem, IonList, IonMenu, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [IonItem, IonList, IonContent, IonMenu, IonTitle, IonToolbar, RouterModule ]
})
export class MenuComponent {}
