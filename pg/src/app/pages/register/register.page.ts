import { Component } from '@angular/core';
import {
  IonCard,
  IonContent,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
  ],
  standalone: true,
})
export class RegisterPage {
  email = '';
  username = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.errorMessage = '';

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Пароли не совпадают';
      return;
    }

    this.authService.register(this.username, this.email, this.password).subscribe({
      next: () => {
        alert(
          `На ${this.email} выслано письмо для подтверждения почты. ` +
            `Если не находите письмо, проверьте спам.`
        );
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message ?? 'Ошибка регистрации';
      },
    });
  }
}
