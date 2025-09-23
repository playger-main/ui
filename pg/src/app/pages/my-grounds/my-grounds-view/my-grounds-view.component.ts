import { Component, OnInit } from '@angular/core';
import {
  IonButton,
  IonIcon,
  IonModal,
  IonContent,
  ActionSheetController,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonSegmentContent,
  IonSegmentView,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonCardHeader,
  IonCard,
  IonListHeader,
} from '@ionic/angular/standalone';
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
  heart,
} from 'ionicons/icons';
import { AppComponent } from 'src/app/app.component';
import { IGround } from 'src/app/interfaces/interfaces';
import { fakeGrounds } from 'src/app/mock';

@Component({
  selector: 'app-my-grounds-view',
  templateUrl: './my-grounds-view.component.html',
  styleUrls: ['./my-grounds-view.component.scss'],
  imports: [
    IonContent,
    IonButton,
    IonLabel,
    IonListHeader,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonIcon,
  ],
})
export class MyGroundsViewComponent implements OnInit {
  constructor() {
    console.log('menu component');
    addIcons({
      homeOutline,
      chatbubbleOutline,
      cashOutline,
      football,
      settingsOutline,
      notificationsOutline,
      gridOutline,
      heart,
    });
  }
  favoriteGrounds = fakeGrounds.splice(0, 7);
  ngOnInit() {}

  goToGroundPage(id: string) {}

  toggleFavorite(event: Event, ground: IGround) {
    event.stopPropagation(); // не открываем карточку при клике на сердце
    ground.isFavorite = !ground.isFavorite;

    // тут можно дернуть сервис или эмитнуть событие наружу
    console.log('Favorite toggled:', ground.name, ground.isFavorite);
  }
}
