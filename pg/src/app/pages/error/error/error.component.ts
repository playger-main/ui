import { Component, OnInit } from '@angular/core';
import { IonContent, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  standalone: true,
  imports: [CommonModule, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonButton, RouterModule],
})
export class ErrorComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
