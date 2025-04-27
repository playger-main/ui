import { Component, inject, OnInit } from '@angular/core';
import { GroundViewComponent } from '../ground-view/ground-view.component';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, tap, map } from 'rxjs';
import { IGround } from 'src/app/interfaces/interfaces';
import { FAKE_GROUND, fakeGrounds } from 'src/app/mock';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ground',
  templateUrl: './ground.component.html',
  styleUrls: ['./ground.component.scss'],
  imports:[CommonModule, GroundViewComponent]
})
export class GroundComponent  implements OnInit {

  constructor() { }

  private route = inject(ActivatedRoute);
  groundId!: string;
  ground$!: Observable<IGround>;

  ngOnInit(): void {
    console.log(this.groundId)
    this.groundId = this.route.snapshot.paramMap.get('id')!;
    this.loadDataChosenGround(this.groundId);
  }

  loadDataChosenGround (id: string) {
    return this.ground$ = of(fakeGrounds.find(ground => ground.id === id)!);
  
  }
  
}
