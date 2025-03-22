import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../UI/explore-container/explore-container.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})
export class SettingsPage {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Settings')
  }
}
