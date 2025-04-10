import { Component } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { person, home, rocket, golf } from 'ionicons/icons';
import { AppComponent } from 'src/app/app.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer-menu',
  templateUrl: 'footer-menu.component.html',
  styleUrls: ['footer-menu.component.scss'],
  imports: [CommonModule, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, RouterModule],
})
export class FooterMenuComponent { 
  constructor(private appComponent: AppComponent) {
    addIcons({ person, home, golf});
  }  
  handlerTabs(title: string) {
    this.appComponent.setPageTitle(title);    
  }
}
