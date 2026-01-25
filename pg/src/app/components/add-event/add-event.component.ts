import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

import { ICreateEventDto } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
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
export class AddEventComponent implements OnInit {
  @Input() modal!: IonModal;

  // ✅ если известно — подставляем автоматически
  @Input() groundId: string | null = null;

  @Output() newEventForm = new EventEmitter<ICreateEventDto>();

  form: ICreateEventDto = {
    name: '',
    description: '',
    date: '',
    startTime: '',
    duration: '',
    groundId: '',   
  };

  ngOnInit() {
    if (this.groundId) this.form.groundId = this.groundId;
  }

  onSubmit() {
    if (!this.form.name || !this.form.date || !this.form.startTime || !this.form.groundId) {
      return;
    }

    this.newEventForm.emit({ ...this.form });
    this.modal.dismiss();
  }
}
