import { Injectable } from '@angular/core';
import { fakeGrounds, fakeGrounds2, fakeListFavKindSport } from '../mock';
import { Observable, of } from 'rxjs';
import { IGround } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class GroundService {
    getListOfGroundsForChosenSport (sport: string): Observable<IGround[]>  {
      console.log(sport);
       return sport == 'football' ? of(fakeGrounds) : of(fakeGrounds2);
    }
}