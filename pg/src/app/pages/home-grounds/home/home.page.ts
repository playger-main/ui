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
    private playGroundService: GroundService,
    private router: Router
  ) {
    addIcons({ add });
  }

  // чтобы template не падал
  listfavoriteKindOfSport$!: Observable<IFavoriteListSport[]>;
  listPlaygrounds$!: Observable<IGround[]>;
  listFavoriteGrounds = signal<IGround[]>([]);

  ngOnInit(): void {
    // пока без fav sports с сервера — просто пустой список, чтобы не падал UI
    this.listfavoriteKindOfSport$ = of<IFavoriteListSport[]>([]);

    // основные данные — с сервера
    this.listPlaygrounds$ = this.playGroundService.getAllGrounds();
  }

  onNewGroundForm(ground: IGround) {
    console.log(ground);
  }

  loadFavGrounds() {
    this.listFavoriteGrounds.set(this.playGroundService.getFavoriteGrounds());
  }
}
