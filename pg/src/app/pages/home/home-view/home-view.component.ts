import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonIcon, IonModal, IonContent, ActionSheetController} from '@ionic/angular/standalone';
import { MapComponent } from 'src/app/components/map/map.component';
import { PlaygroundsComponent } from 'src/app/components/playgrounds/playgrounds.component';
import { SearchComponent } from 'src/app/components/search/search.component';
import { IFavoriteListSport, IGround } from 'src/app/interfaces/interfaces';
import { add } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AddEventComponent } from 'src/app/components/add-event/add-event.component';



@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss'],
  imports: [CommonModule, IonModal, AddEventComponent,  IonIcon,IonButton, PlaygroundsComponent, SearchComponent, MapComponent, FormsModule, IonContent],

})
export class HomeViewComponent  implements OnInit {

  constructor(private actionSheetCtrl: ActionSheetController) {
    addIcons({ add });
  }
  
  @Input() listfavoriteKindOfSport: IFavoriteListSport[]| null = null;
  @Input() listPlaygrounds: IGround[]| null = null;
  @Input() selectedKindOfSport: string| null = null;
  @Output() createEvent = new EventEmitter<Event>();
  @Output() onNewGroundForm = new EventEmitter<IGround>()

  presentingElement!: HTMLElement | null;

  private canDismissOverride = false;

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
  }

  onDismissChange(canDismiss: boolean) {
    // Allows the modal to be dismissed based on the state of the checkbox
    this.canDismissOverride = canDismiss;
  }

  onWillPresent() {
    // Resets the override when the modal is presented
    this.canDismissOverride = false;
  }


 
}
