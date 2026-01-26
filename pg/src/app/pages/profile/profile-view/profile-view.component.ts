// ui/pg/src/app/pages/profile/profile-view/profile-view.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import {
  IonContent,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,

  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,

  IonSegment,
  IonSegmentButton,

  IonInput,
  IonToolbar,
} from '@ionic/angular/standalone';

import { ICurrentUser, IEvent, IGround } from 'src/app/interfaces/interfaces';

import { addIcons } from 'ionicons';
import {
  mailOutline,
  heart,
  locationOutline,
  calendarOutline,
  personOutline,
  checkmarkCircleOutline,
  footballOutline,
  calendarNumberOutline,
  checkmarkDoneCircleOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    IonContent,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    IonIcon,
    IonButton,
    IonCard,
    IonCardContent,
    IonInput,
  ],
})
export class ProfileViewComponent {
  constructor() {
    addIcons({
      mailOutline,
      heart,
      locationOutline,
      calendarOutline,
      personOutline,
      checkmarkCircleOutline,
      footballOutline,
      calendarNumberOutline,
      checkmarkDoneCircleOutline,
    });
  }

  // async pipe может дать null до загрузки — поэтому дефолты:
  @Input() user: ICurrentUser | null = null;
  @Input() favoriteGrounds: IGround[] | null = null;
  @Input() futureEvents: IEvent[] | null = null;

  showPasswordSettings = false;
  showEvents = false;
}
