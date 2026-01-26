import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonIcon, IonList } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { calendar, heart, locationOutline, star, starOutline } from 'ionicons/icons';

import { IGround } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-playgrounds',
  templateUrl: './playgrounds.component.html',
  styleUrls: ['./playgrounds.component.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon, IonList, RouterModule],
})
export class PlaygroundsComponent {
  Math = Math;

  @Input() listPlaygrounds: IGround[] | null = null;
  @Input() currentKindOfSport: string | null = null; // если нужно для фильтра — оставим

  /** Родитель решает: сохранить или удалить из избранного через API */
  @Output() favoriteToggled = new EventEmitter<IGround>();

  constructor(private router: Router) {
    addIcons({ heart, star, calendar, starOutline, locationOutline });
  }

  navigateToGround(id: string) {
    this.router.navigate(['/ground', id]);
  }

  onToggleFavorite(item: IGround, event: Event) {
    event.stopPropagation();
    this.favoriteToggled.emit(item);
  }
}
