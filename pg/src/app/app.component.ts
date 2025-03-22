import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { MenuComponent } from './components/navigation/menu/menu.component';
import { TabsComponent } from './components/navigation/tabs/tabs.component';
import { HeaderComponent } from './components/UI/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, MenuComponent, TabsComponent, HeaderComponent],
})
export class AppComponent {}
