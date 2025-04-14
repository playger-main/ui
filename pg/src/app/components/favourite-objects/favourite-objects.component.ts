import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonIcon, IonLabel, IonSegment, IonSegmentButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { barbell, basketball, football } from 'ionicons/icons';
import { AppComponent } from 'src/app/app.component';
import { IFavoriteListSport } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-favourite-objects',
  templateUrl: './favourite-objects.component.html',
  styleUrls: ['./favourite-objects.component.scss'],
  imports: [IonIcon,IonLabel, CommonModule, IonSegment, IonSegmentButton,  FormsModule,]
})
export class FavouriteObjectsComponent  implements OnInit {

  constructor(private appComponent: AppComponent) {
    addIcons({ football, basketball, barbell});
  }  

  ngOnInit() {}


  @Input() listfavoriteKindOfSport: IFavoriteListSport[] | null = null;


  selectedKindOfSport = this.listfavoriteKindOfSport? this.listfavoriteKindOfSport[0] : '';
}
