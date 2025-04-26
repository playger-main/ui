import { Component, inject, OnInit } from '@angular/core';
import { GroundViewComponent } from '../ground-view/ground-view.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ground',
  templateUrl: './ground.component.html',
  styleUrls: ['./ground.component.scss'],
  imports:[GroundViewComponent]
})
export class GroundComponent  implements OnInit {

  constructor() { }

  private route = inject(ActivatedRoute);
  groundId!: string;

  ngOnInit(): void {
    this.groundId = this.route.snapshot.paramMap.get('id')!;

  }

  loadDataChosenGround (id: string) {

  }
  

}
