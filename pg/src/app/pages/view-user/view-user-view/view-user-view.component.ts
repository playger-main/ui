import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/interfaces';
import { IonCard, IonContent, IonListHeader, IonList,  IonLabel, IonItem, IonIcon, IonCardContent, IonCardHeader, IonCardSubtitle,IonCardTitle } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { mailOutline, locationOutline, calendarOutline, personOutline, checkmarkCircleOutline, footballOutline, calendarNumberOutline, checkmarkDoneCircleOutline } from 'ionicons/icons';




@Component({
  selector: 'app-view-user-view',
  templateUrl: './view-user-view.component.html',
  styleUrls: ['./view-user-view.component.scss'],
  imports: [CommonModule, IonContent, IonIcon, IonLabel, IonList,  IonListHeader, IonItem, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent]
})
export class ViewUserViewComponent  implements OnInit {

  constructor() {
    addIcons({ mailOutline, locationOutline, calendarOutline, personOutline, checkmarkCircleOutline, footballOutline, calendarNumberOutline, checkmarkDoneCircleOutline});
   }
  @Input() user!: IUser | null ;
  ngOnInit() {}

}
