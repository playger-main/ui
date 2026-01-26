import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonIcon,
  IonLabel,
  IonSegment,
  IonSegmentButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { barbell, basketball, football } from 'ionicons/icons';
import { IFavoriteListSport } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-favourite-objects',
  templateUrl: './favourite-objects.component.html',
  styleUrls: ['./favourite-objects.component.scss'],
  standalone: true,
  imports: [IonIcon, IonLabel, CommonModule, IonSegment, IonSegmentButton, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavouriteObjectsComponent implements OnChanges {
  constructor() {
    addIcons({ football, basketball, barbell });
  }

  @Input() listfavoriteKindOfSport: IFavoriteListSport[] | null = null;

  /**
   * Можно передавать из родителя, чтобы контролировать выбранный сегмент.
   * Если родитель не передал — выберем первый из списка автоматически.
   */
  @Input() selectedKindOfSport: string | null = null;

  @Output() kindOfSportChanged = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges): void {
    // если список пришёл асинхронно и выбранного ещё нет — выбираем первый
    if (
      (changes['listfavoriteKindOfSport'] || changes['selectedKindOfSport']) &&
      !this.selectedKindOfSport &&
      this.listfavoriteKindOfSport?.length
    ) {
      this.selectedKindOfSport = this.listfavoriteKindOfSport[0].type;
      this.kindOfSportChanged.emit(this.selectedKindOfSport.toLowerCase());
    }
  }

  onSegmentChange(event: CustomEvent) {
    const value = String(event.detail?.value ?? '');
    this.kindOfSportChanged.emit(value.toLowerCase());
  }
}
