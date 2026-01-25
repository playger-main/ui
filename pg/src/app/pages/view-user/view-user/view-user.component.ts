import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewUserViewComponent } from '../view-user-view/view-user-view.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { IUser } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
  imports: [CommonModule, ViewUserViewComponent],
})
export class ViewUserComponent implements OnInit {
  user$!: Observable<IUser | null>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.user$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        if (!id) return of(null);
        return this.userService.getUserById(id);
      }),
      catchError((err) => {
        console.warn('ViewUserComponent load failed:', err);
        this.router.navigate(['/error']);
        return of(null);
      })
    );
  }
}
