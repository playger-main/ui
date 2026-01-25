import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  IonButton,
  IonIcon,
  IonContent,
  IonLabel,
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
  heart,
  heartOutline,
} from 'ionicons/icons';

import { IGround } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-my-grounds-view',
  templateUrl: './my-grounds-view.component.html',
  styleUrls: ['./my-grounds-view.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
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
    addIcons({
      homeOutline,
      chatbubbleOutline,
      cashOutline,
      football,
      settingsOutline,
      notificationsOutline,
      gridOutline,
      heart,
      heartOutline,
    });
  }

  // ✅ приходит сверху (из MyGroundsComponent)
  @Input() favoriteGrounds: IGround[] | null = [];

  // ✅ события наружу
  @Output() goToGroundPage = new EventEmitter<string>();
  @Output() toggleFavorite = new EventEmitter<IGround>();

  ngOnInit() {}

  onGroundClick(id: string) {
    this.goToGroundPage.emit(id);
  }

  onToggleFavorite(ev: Event, ground: IGround) {
    ev.stopPropagation();
    this.toggleFavorite.emit(ground);
  }

  trackById(_: number, g: IGround) {
    return g.id;
  }
}
