import { Component, OnInit } from '@angular/core';
import {  IonModal } from '@ionic/angular/standalone';

@Component({
  selector: 'app-drop-down-panel',
  templateUrl: './drop-down-panel.component.html',
  styleUrls: ['./drop-down-panel.component.scss'],
  imports: [IonModal],
  host: { 'class': 'modal-sheet' } // 👈 This adds class to the host

})
export class DropDownPanelComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
