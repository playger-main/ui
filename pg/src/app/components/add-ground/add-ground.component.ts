import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonModal,
  IonToolbar,
  IonTitle,
  IonLabel,
  IonInput,
  IonTextarea,
} from '@ionic/angular/standalone';

import { IGround } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-add-ground',
  templateUrl: './add-ground.component.html',
  styleUrls: ['./add-ground.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonToolbar,
    IonTitle,
  ],
})
export class AddGroundComponent implements OnInit {
  @Input() modal!: IonModal;
  @Output() newGroundForm = new EventEmitter<IGround>();

  // ✅ текстовые поля для ввода массивов
  coverageText = '';
  kindofsportText = '';

  // ✅ новая модель IGround
  ground: IGround = {
    id: '',
    name: '',
    description: '',
    address: '',
    kindofsport: [],
    coverage: [],
    geolocation: { lat: 0, lng: 0 },
    createdAt: '',
    updatedAt: '',
    eventsCount: 0,
    isFavorite: false,
    avgRating: 0,
    avatar: '',
  };

  constructor() {}

  ngOnInit() {}

  private csvToArray(text: string): string[] {
    return (text ?? '')
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
  }

  onSubmit() {
    const payload: IGround = {
      ...this.ground,
      coverage: this.csvToArray(this.coverageText),
      kindofsport: this.csvToArray(this.kindofsportText),
    };

    this.modal.dismiss(payload);
    this.newGroundForm.emit(payload);
  }
}
