import { Injectable } from '@angular/core';
import { fakeGrounds, fakeListFavKindSport, USERS_MOCK } from '../mock';
import { Observable, of } from 'rxjs';
import { IFavoriteListSport, IGround, IUser } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {

    getListOfFavKindSport (): Observable<IFavoriteListSport[]>{
        return of(fakeListFavKindSport)
    }

    getUserById(id: string): Observable<IUser> {
      return of(USERS_MOCK.find(user=> user.id === id) as IUser);
    }

  
    
    
}