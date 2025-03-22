import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../UI/explore-container/explore-container.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent]
})
export class ProfilePage {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Profile')
  }
}
