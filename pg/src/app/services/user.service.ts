import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { fakeGrounds, fakeListFavKindSport, USERS_MOCK } from '../mock';
import { Observable, of } from 'rxjs';
import { ICurrentUser, IFavoriteListSport, IGround, IUser } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';// Replace with your actual API URL


@Injectable({
  providedIn: 'root',
})
export class UserService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getListOfFavKindSport (): Observable<IFavoriteListSport[]>{
        return of(fakeListFavKindSport)
    }

    getUserById(id: string): Observable<IUser> {
      return of(USERS_MOCK.find(user=> user.id === id) as IUser);
    }

    getCurrentUser(id: string){
      const user = of(USERS_MOCK.find(user=> user.id === 'user1') as ICurrentUser);
      console.log(user.subscribe(data=> console.log(data)))
      return user;
    }

  
    
    
}