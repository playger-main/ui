import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { IonCard, IonContent, IonCardHeader, IonCardContent, IonCardTitle, IonItem, IonLabel, IonInput, IonButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [CommonModule, FormsModule, RouterModule, IonContent, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonItem, IonLabel, IonInput, IonButton],
  standalone: true,
})
export class LoginPage {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.email, this.password);
  }
}
