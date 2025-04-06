import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons } from '@ionic/angular/standalone';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [ IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons, CommonModule]
})
export class HeaderComponent {
  @Input() title: string = 'Home'; 
  constructor() {}
}