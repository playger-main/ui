import { Component, Input, OnInit } from '@angular/core';
import {
  IonCard,
  IonCardTitle,
  IonItem,
  IonInput,
  IonList,
  IonListHeader,
  IonContent,
  IonLabel,
  IonButton,
  IonIcon,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
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
  imports: [
    CommonModule,
    IonInput,
    IonList,
    IonListHeader,
    IonItem,
    IonButton,
    IonIcon,
    IonContent,
    IonLabel,
    IonCard,
    IonCardContent,
  ],
})
export class ProfileViewComponent implements OnInit {
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

  ngOnInit() {
    console.log(this.futureEvents);
  }
  @Input() user!: ICurrentUser | null;
  @Input() favoriteGrounds!: IGround[] | null;
  @Input() futureEvents!: IEvent[] | null;

  showPasswordSettings = false;
  showEvents = false;
}
