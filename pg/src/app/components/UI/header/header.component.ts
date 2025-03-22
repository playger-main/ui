import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons } from '@ionic/angular/standalone';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [ IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons]
})
export class HeaderComponent  implements OnInit {
  constructor(private router: Router, private activeRoute: ActivatedRoute) { }
  ngOnInit() {}
}
