import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  loginForm?: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      courriel: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  // ngOnInit(): void {
  //   this.loginForm = this.formBuilder.group({
  //     courriel: ['', [Validators.required, Validators.email]],
  //     password: ['', [Validators.required, Validators.minLength(5)]],
  //   });
  // }

  submitForm(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.courriel;
      const password = this.loginForm.value.password;
      this.authService.login(email, password).subscribe(
        (response) => {
          console.log('Login réussi');
        },
        (error) => {
          console.log('Erreur de connexion');
        }
      );
    }
  }
}
