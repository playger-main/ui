import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  output,
} from '@angular/core';
import { IEvent } from 'src/app/interfaces/interfaces';
import {
  IonCard,
  IonIcon,
  IonButton,
  IonContent,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonList,
  IonModal,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { add } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEventComponent } from 'src/app/components/add-event/add-event.component';

@Component({
  selector: 'app-events-view',
  templateUrl: './events-view.component.html',
  styleUrls: ['./events-view.component.scss'],
  imports: [
    CommonModule,
    IonIcon,
    IonButton,
    IonCard,
    IonContent,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonList,
    FormsModule,
    ReactiveFormsModule,
    IonModal,
    AddEventComponent,
  ],
})
export class EventsViewComponent implements OnInit {
  presentingElement!: HTMLElement | null;

  private canDismissOverride = false;
  constructor() {
    addIcons({ add });
  }

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
  }

  @Input() listEvents!: IEvent[] | null;
  @Output() goToCurrentEventPage = new EventEmitter<string>();

  onNewEventForm = output<any>();

  onDismissChange(canDismiss: boolean) {
    // Allows the modal to be dismissed based on the state of the checkbox
    this.canDismissOverride = canDismiss;
  }
  onWillPresent() {
    // Resets the override when the modal is presented
    this.canDismissOverride = false;
  }
}
