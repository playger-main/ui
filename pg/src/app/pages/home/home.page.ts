import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  IonContent, IonModal, IonSegment, IonSegmentButton, IonItem, IonLabel, IonList, IonToggle, Gesture, GestureController, IonIcon, IonTabButton, IonTabBar, IonTabs } from '@ionic/angular/standalone';
import { DropDownPanelComponent } from 'src/app/components/drop-down-panel/drop-down-panel.component';
import { MapComponent } from 'src/app/components/map/map.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule,MapComponent, FormsModule, DropDownPanelComponent, IonContent],
})
export class HomePage {
  
  isExpanded = false;
  selectedTransport: string = 'car';

  addresses: string[] = [
    '123 Main Street',
    '456 Elm Street',
    '789 Oak Avenue',
    '101 Pine Road',
    '202 Maple Lane'
  ];

  


 
}
