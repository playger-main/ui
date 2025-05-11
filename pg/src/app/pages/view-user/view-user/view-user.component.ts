import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewUserViewComponent} from '../view-user-view/view-user-view.component'
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { catchError, Observable, of } from 'rxjs';
import { IUser } from 'src/app/interfaces/interfaces';


@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
  imports: [CommonModule, ViewUserViewComponent]
})
export class ViewUserComponent implements OnInit {

  user$!: Observable<IUser | null>;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
  
    if (!id) {
      this.router.navigate(['/error']);
      return;
    }
  
    this.user$ = this.getUserById(id).pipe(
      catchError(err => {
        this.router.navigate(['/error']);
        return of(null);
      })
    );
  }


getUserById(id: string): Observable<IUser> {
  return this.userService.getUserById(id);
}
}

