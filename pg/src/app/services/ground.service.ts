import { Injectable, signal } from '@angular/core';
import { fakeGrounds } from '../mock';
import { Observable, of } from 'rxjs';
import { IGround } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class GroundService {

 selectedSport = signal<string>(''); 
 private readonly FAVORITES_KEY = 'favoriteGrounds';


  setSelectedGround(value: string) {
    this.selectedSport.set(value);
  }

  getSelectedGGround() {
    return this.selectedSport;
  }

  //get list of Ground for chosen kind of Sport from API
  getListOfGroundsForChosenSport(): Observable<IGround[]> {
    console.log('request GET')
    const selectedKindOfSport = this.getSelectedGGround(); 
    const kind = selectedKindOfSport(); 
    switch (kind) {
      case 'football':
        return of(fakeGrounds);
      // case 'basketball':
      //   return of(fakeGrounds2);
      // case 'workout':
      //   return of(fakeGrounds3);
      default:
        return of([]); 
    }
  }

  getGroundById(id: string) : Observable<IGround> {
    return of(fakeGrounds.find(ground => ground.id === id)!);
  }

    // Save a ground to favorites
    saveFavoriteGround(ground: IGround): void {
      const favorites = this.getFavoriteGrounds();
    
      if (!favorites.some(fav => fav.id === ground.id)) {
        favorites.push(ground);
        localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
      }
    }
    
    

  /// Delete a ground from favorites
deleteFavoriteGround(groundId: string): void {
  const favorites = this.getFavoriteGrounds();

  if (!favorites.length) return;

  const updatedFavorites = favorites.filter(fav => fav.id !== groundId);
  localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(updatedFavorites));
}


// Get all favorite grounds from localStorage
getFavoriteGrounds(): IGround[] {
  const stored = localStorage.getItem(this.FAVORITES_KEY);

  try {
    return stored ? JSON.parse(stored) as IGround[] : [];
  } catch (e) {
    console.warn('Failed to parse favorite grounds:', e);
    return [];
  }
}


}  


