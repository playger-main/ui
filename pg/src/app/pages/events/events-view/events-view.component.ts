import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { add } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddEventComponent } from 'src/app/components/add-event/add-event.component';
import { ICreateEventDto, ICurrentUser, IEvent } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-events-view',
  templateUrl: './events-view.component.html',
  styleUrls: ['./events-view.component.scss'],
  standalone: true,
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

  constructor(private userService: UserService) {
    addIcons({ add });
  }

  @Input() listEvents: IEvent[] | null = null;
  @Input() currentUser: ICurrentUser | null = null;

  @Input() groundId: string | null = null;

  @Output() goToCurrentEventPage = new EventEmitter<string>();
  @Output() newEventForm = new EventEmitter<ICreateEventDto>();

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
  }

  get canCreateEvent(): boolean {
    return this.userService.canCreateEvent(this.currentUser);
  }

  onDismissChange(canDismiss: boolean) {
    this.canDismissOverride = canDismiss;
  }

  onWillPresent() {
    this.canDismissOverride = false;
  }

  onCreated(dto: ICreateEventDto) {
    this.newEventForm.emit(dto);
  }
}
