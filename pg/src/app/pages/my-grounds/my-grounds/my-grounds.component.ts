import { Component, OnInit } from '@angular/core';
import { MyGroundsViewComponent } from '../my-grounds-view/my-grounds-view.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-grounds',
  templateUrl: './my-grounds.component.html',
  styleUrls: ['./my-grounds.component.scss'],
  imports: [CommonModule, MyGroundsViewComponent],
})
export class MyGroundsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
