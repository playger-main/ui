import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { MenuComponent } from './components/common/menu/menu.component';
import { TabsComponent } from './components/common/tabs/tabs.component';
import { HeaderComponent } from './components/common/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, MenuComponent, TabsComponent, HeaderComponent],
})
export class AppComponent {
  pageTitle: string = 'Home';

  setPageTitle(title: string) {
    this.pageTitle = title;
  }  
}