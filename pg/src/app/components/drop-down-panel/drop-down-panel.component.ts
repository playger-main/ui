import { Component, OnInit } from '@angular/core';
import { IonIcon, IonLabel, IonModal } from '@ionic/angular/standalone';
import { SearchComponent } from '../search/search.component';
import { FavouriteObjectsComponent } from '../favourite-objects/favourite-objects.component';

@Component({
  selector: 'app-drop-down-panel',
  templateUrl: './drop-down-panel.component.html',
  styleUrls: ['./drop-down-panel.component.scss'],
  imports: [IonModal, SearchComponent, FavouriteObjectsComponent],
  host: { 'class': 'modal-sheet' } // 👈 This adds class to the host

})
export class DropDownPanelComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
