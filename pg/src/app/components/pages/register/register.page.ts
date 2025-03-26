import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { IonCard, IonContent, IonCardHeader, IonCardContent, IonCardTitle, IonItem, IonLabel, IonInput, IonButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  imports: [CommonModule, FormsModule, RouterModule, IonContent, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonItem, IonLabel, IonInput, IonButton],
  standalone: true,
})
export class RegisterPage {
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  constructor(private authService: AuthService) {}

  register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Пароли не совпадают';
      return;
    }
    this.authService.register(this.email, this.password);
  }
}
