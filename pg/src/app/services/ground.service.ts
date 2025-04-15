import { Injectable, signal } from '@angular/core';
import { fakeGrounds, fakeGrounds2, fakeListFavKindSport } from '../mock';
import { Observable, of } from 'rxjs';
import { IGround } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class GroundService {

   

 selectedSport = signal<string>(''); 

  setSelectedGround(value: string) {
    this.selectedSport.set(value);
  }

  getSelectedGGround() {
    return this.selectedSport;
  }

  getListOfGroundsForChosenSport (): Observable<IGround[]>  {

    const selectedKindOfSport = this.selectedSport();
    console.log(selectedKindOfSport);
     return selectedKindOfSport == 'football' ? of(fakeGrounds) : of(fakeGrounds2);
  }
}


