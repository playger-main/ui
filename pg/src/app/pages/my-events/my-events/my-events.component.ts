import { Component, OnInit } from '@angular/core';
import { MyEventsViewComponent } from '../my-events-view/my-events-view.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.scss'],
  imports: [CommonModule, MyEventsViewComponent],
})
export class MyEventsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
