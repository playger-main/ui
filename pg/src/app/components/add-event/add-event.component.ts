import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  CheckboxCustomEvent,
  IonButton,
  IonButtons,

  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonModal,
  IonNote,
  IonToolbar,
  IonTitle,
  IonLabel,
  IonInput,
  IonTextarea
} from '@ionic/angular/standalone';

import { IGround } from 'src/app/interfaces/interfaces';
@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
  imports: [CommonModule, FormsModule, IonLabel, IonInput, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonList, IonToolbar, IonTitle],

})
export class AddEventComponent  implements OnInit {

  ground: IGround = {
    id: '',
    name: '',
    coverage: '',
    description: '',
    kindOfsport:'',
    createdAt: '',
    updatedAt: '',
    location: { lat: '', lng: '', address: '' },
    reviews: null,
    avatar: '',
    averageRating: 0,
    listImgs: []
  };

  constructor() { }

  ngOnInit() {}

  @Input() modal!: IonModal;
  @Output() newGroundForm = new EventEmitter<IGround>();
  

  onSubmit() {
    this.modal.dismiss(this.ground);
    this.newGroundForm.emit(this.ground);
  }

}
