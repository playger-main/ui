import { CommonModule } from '@angular/common';
import { Component, input, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  IonBadge,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonList,
} from '@ionic/angular/standalone';
import { IGround } from 'src/app/interfaces/interfaces';
import {
  star,
  heart,
  calendar,
  starOutline,
  locationOutline,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
@Component({
  selector: 'app-playgrounds',
  templateUrl: './playgrounds.component.html',
  styleUrls: ['./playgrounds.component.scss'],
  imports: [
    CommonModule,
    IonIcon,
    IonList,
    RouterModule,
    IonBadge,
    IonTabButton,
    IonIcon,
  ],
})
export class PlaygroundsComponent implements OnInit {
  constructor(private router: Router) {
    addIcons({
      heart,
      star,
      calendar,
      starOutline,
      locationOutline,
    });
  }

  listFavoriteGrounds = input<IGround[]>();

  ngOnInit() {
    console.log('playgrounds component');
    const saved = localStorage.getItem('favorites');
    if (saved) {
      const favs = JSON.parse(saved);
      this.listPlaygrounds?.forEach((p) => {
        p.isFavorite = favs.some((f: any) => f.id === p.id);
      });
      this.listFavoriteGrounds = favs;
    }
  }

  Math = Math;

  @Input() listPlaygrounds: IGround[] | null = null;

  @Input() currentKindOfSport: string | null = null;

  navigateToGround(id: string) {
    this.router.navigate(['/ground', id]);
  }

  toggleFavorite(item: any, event: Event) {
    event.stopPropagation();
    item.isFavorite = !item.isFavorite;

    if (item.isFavorite) {
      // добавляем
      this.listFavoriteGrounds()?.push(item);
    } else {
      // убираем
      // this.listFavoriteGrounds = this.listFavoriteGrounds()?.filter(
      //   (f) => f.id !== item.id
      // );
    }

    // если список пустой — очищаем localStorage
    if (this.listFavoriteGrounds.length === 0) {
      localStorage.removeItem('favorites');
    } else {
      localStorage.setItem(
        'favorites',
        JSON.stringify(this.listFavoriteGrounds),
      );
    }
  }
}
