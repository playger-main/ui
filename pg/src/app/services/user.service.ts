import { Injectable } from '@angular/core';
import { fakeGrounds, fakeListFavKindSport } from '../mock';
import { Observable, of } from 'rxjs';
import { IFavoriteListSport, IGround } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {

    getListOfFavKindSport (): Observable<IFavoriteListSport[]>{
        return of(fakeListFavKindSport)
    }
}