import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import {  IonModal } from '@ionic/angular/standalone';

@Component({
  selector: 'app-drop-down-panel',
  templateUrl: './drop-down-panel.component.html',
  styleUrls: ['./drop-down-panel.component.scss'],
  imports: [ CommonModule],

})
export class DropDownPanelComponent  implements OnInit{

  constructor() { }

  ngOnInit() {
    console.log('drop-down-panel component')
  }

}
