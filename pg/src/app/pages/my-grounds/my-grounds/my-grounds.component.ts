import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
import { catchError, shareReplay, startWith, switchMap } from 'rxjs/operators';

import { IGround } from 'src/app/interfaces/interfaces';
import { GroundService } from 'src/app/services/ground.service';
import { MyGroundsViewComponent } from '../my-grounds-view/my-grounds-view.component';

@Component({
  selector: 'app-my-grounds',
  templateUrl: './my-grounds.component.html',
  styleUrls: ['./my-grounds.component.scss'],
  standalone: true,
  imports: [CommonModule, MyGroundsViewComponent],
})
export class MyGroundsComponent implements OnInit {
  private router = inject(Router);

  favoriteGrounds$!: Observable<IGround[]>;
  private refresh$ = new Subject<void>();

  constructor(private groundService: GroundService) {}

  ngOnInit(): void {
    this.favoriteGrounds$ = this.refresh$.pipe(
      startWith(void 0),
      switchMap(() =>
        this.groundService.getFavoriteGrounds().pipe(
          catchError((err) => {
            console.warn('GET /favorite failed:', err);
            return of<IGround[]>([]);
          })
        )
      ),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  goToGroundPage(id: string): void {
    this.router.navigate(['/ground', id]);
  }

  toggleFavorite(g: IGround): void {
    // на странице "Favorite Grounds" смысл кнопки — удалить из избранного
    this.groundService.deleteFavoriteGround(g.id).subscribe({
      next: () => this.refresh$.next(),
      error: (err) => console.warn('DELETE /favorite failed:', err),
    });
  }
}
