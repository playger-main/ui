import { Component } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { person, home } from 'ionicons/icons';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.component.html',
  styleUrls: ['tabs.component.scss'],
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, RouterModule],
})
export class TabsComponent { 
  constructor(private appComponent: AppComponent) {
    addIcons({ person, home });
  }  
  handlerTabs(title: string) {
    this.appComponent.setPageTitle(title);    
  }
}
