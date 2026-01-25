import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonIcon,
  IonModal,
  IonContent,
  ActionSheetController,
} from '@ionic/angular/standalone';
import { add } from 'ionicons/icons';
import { addIcons } from 'ionicons';

import { MapComponent } from 'src/app/components/map/map.component';
import { PlaygroundsComponent } from 'src/app/components/playgrounds/playgrounds.component';
import { SearchComponent } from 'src/app/components/search/search.component';
import { AddGroundComponent } from 'src/app/components/add-ground/add-ground.component';
import { IFavoriteListSport, IGround } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss'],
  imports: [
    CommonModule,
    IonModal,
    IonIcon,
    IonButton,
    PlaygroundsComponent,
    SearchComponent,
    MapComponent,
    FormsModule,
    IonContent,
    AddGroundComponent,
  ],
})
export class HomeViewComponent implements OnInit {
  constructor(private actionSheetCtrl: ActionSheetController) {
    addIcons({ add });
  }

  @Input() listfavoriteKindOfSport: IFavoriteListSport[] | null = null;
  @Input() listPlaygrounds: IGround[] | null = null;
  @Input() selectedKindOfSport: string | null = null;

  onNewGroundForm = output<IGround>();
  listFavoriteGrounds = input<IGround[]>();

  presentingElement!: HTMLElement | null;
  private canDismissOverride = false;

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
  }

  onDismissChange(canDismiss: boolean) {
    this.canDismissOverride = canDismiss;
  }

  onWillPresent() {
    this.canDismissOverride = false;
  }
}
