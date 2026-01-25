import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonCardContent,
  IonButton,
  IonCard,
  IonList,
  IonIcon,
  IonItem,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonLabel,
} from '@ionic/angular/standalone';

import { IEvent, IGround } from 'src/app/interfaces/interfaces';

import { addIcons } from 'ionicons';
import { star, starOutline, heart, heartOutline } from 'ionicons/icons';

@Component({
  selector: 'app-ground-view',
  templateUrl: './ground-view.component.html',
  styleUrls: ['./ground-view.component.scss'],
  imports: [
    CommonModule,
    IonButton,
    IonIcon,
    IonList,
    IonLabel,
    IonItem,
    IonCard,
    IonContent,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
  ],
})
export class GroundViewComponent implements OnInit, OnChanges {
  constructor() {
    // ✅ чтобы работали: 'heart', 'heart-outline', 'star', 'star-outline'
    addIcons({ heart, heartOutline, star, starOutline });
  }

  showFeedback = false;
  showEvents = false;

  @Input() ground: IGround | null = null;
  @Input() isFavorite = false;
  @Input() eventsForGround: IEvent[] | null = null;

  @Output() eventClicked = new EventEmitter<string>();
  @Output() addToFavorites = new EventEmitter<IGround>();
  @Output() removeFromFavorites = new EventEmitter<IGround>();

  ngOnInit() {
    // можно убрать, но пусть пока будет
    console.log('GroundView init ground:', this.ground);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ground']) {
      console.log('GroundView ground changed:', changes['ground'].currentValue);
    }
  }

  toggleFeedback() {
    this.showFeedback = !this.showFeedback;
  }

  toggleEvents() {
    this.showEvents = !this.showEvents;
  }

  onToggleFavorite(ground: IGround) {
    if (this.isFavorite) {
      this.removeFromFavorites.emit(ground);
    } else {
      this.addToFavorites.emit(ground);
    }
  }
}
