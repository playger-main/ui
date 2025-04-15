import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
  imports: [IonIcon,IonLabel, CommonModule, IonSegment, IonSegmentButton,  FormsModule,],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavouriteObjectsComponent implements OnInit {

  constructor(private appComponent: AppComponent) {
    console.log(this.selectedKindOfSport)
    addIcons({ football, basketball, barbell});
  } 
  ngOnInit(): void {
    this.selectedKindOfSport = this.listfavoriteKindOfSport ? this.listfavoriteKindOfSport[0].type : '';
  }
 
  @Input() listfavoriteKindOfSport: IFavoriteListSport[] | null = null;
  @Input()  selectedKindOfSport!: string;


  @Output() kindOfSportChanged = new EventEmitter<string>();

  onSegmentChange(event: CustomEvent) {
    this.kindOfSportChanged.emit(event.detail.value.toLowerCase());
  }
  
}
