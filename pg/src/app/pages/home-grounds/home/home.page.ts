// ui/pg/src/app/pages/home-grounds/home/home.page.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';

import { IGround, IFavoriteListSport } from 'src/app/interfaces/interfaces';
import { GroundService } from 'src/app/services/ground.service';
import { AppComponent } from 'src/app/app.component';
import { HomeViewComponent } from '../home-view/home-view.component';
import { mapTo } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, HomeViewComponent],
})
export class HomePage implements OnInit {
  constructor(
    public appComponent: AppComponent,
    private groundService: GroundService,
    private router: Router
  ) {
    addIcons({ add });
  }

  listfavoriteKindOfSport$!: Observable<IFavoriteListSport[]>;
  listPlaygrounds$!: Observable<IGround[]>;

  /** серверное избранное: список площадок */
  favoriteGrounds = signal<IGround[]>([]);

  ngOnInit(): void {
    this.listfavoriteKindOfSport$ = of<IFavoriteListSport[]>([]);
    this.listPlaygrounds$ = this.groundService.getAllGrounds();

    this.reloadFavorites();
  }

  onNewGroundForm(ground: IGround) {
    console.log(ground);
  }

  /** перезагрузить избранное с сервера */
  reloadFavorites() {
    this.groundService.getFavoriteGrounds().subscribe({
      next: (list) => this.favoriteGrounds.set(Array.isArray(list) ? list : []),
      error: (err: unknown) => {
        console.warn('GET /favorite failed:', err);
        this.favoriteGrounds.set([]);
      },
    });
  }

  /** обработка клика по сердечку (добавить/убрать) */
  onFavoriteToggled(g: IGround) {
    // ✅ приводим к одному типу Observable<void>, чтобы TS не ругался на subscribe
    const req$: Observable<void> = g.isFavorite
      ? this.groundService.deleteFavoriteGround(g.id)
      : this.groundService.saveFavoriteGround(g.id).pipe(mapTo(void 0));

    req$.subscribe({
      next: () => {
        g.isFavorite = !g.isFavorite;
        this.reloadFavorites();
      },
      error: (err: unknown) => console.warn('favorite toggle failed:', err),
    });
  }
}
