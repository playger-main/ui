import { Injectable } from '@angular/core';
import { fakeGrounds, fakeListFavKindSport } from '../mock';
import { Observable, of } from 'rxjs';
import { IGround } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class GroundService {
    getListOfBasketballGrounds (): Observable<IGround[]>  {
       return of(fakeGrounds);
    }

    getListOfWorkoutGrounds (): Observable<IGround[]>  {
        return of(fakeGrounds);
     }

     getListOfFootballGrounds (): Observable<IGround[]>  {
        return of(fakeGrounds);
     }
}