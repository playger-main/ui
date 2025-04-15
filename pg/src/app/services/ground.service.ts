import { Injectable, signal } from '@angular/core';
import { fakeGrounds, fakeGrounds2, fakeGrounds3, fakeListFavKindSport } from '../mock';
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

  getListOfGroundsForChosenSport(): Observable<IGround[]> {
    const selectedKindOfSport = this.getSelectedGGround(); 
    const kind = selectedKindOfSport(); 
    switch (kind) {
      case 'football':
        return of(fakeGrounds);
      case 'basketball':
        return of(fakeGrounds2);
      case 'workout':
        return of(fakeGrounds3);
      default:
        return of([]); 
    }
  }
}  


