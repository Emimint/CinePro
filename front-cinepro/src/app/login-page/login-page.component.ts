import { Component, ViewChild, ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

declare var $: any;

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  errorMessage: Array<string> = [];
  loginForm?: FormGroup;
  isNewUser: boolean = false;
  @ViewChild('loginModal') loginModal!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      courriel: ['', [Validators.required, Validators.email]],
      password: [''],
      // À decommenter en production :
      // password: ['', [Validators.required, this.passwordValidator]],
      nom: ['', [Validators.minLength(3)]],
      prenom: ['', [Validators.minLength(3)]],
    });
  }

  submitForm(): void {
    this.errorMessage = [];
    if (this.loginForm.valid) {
      if (this.isNewUser) {
      } else {
        const email = this.loginForm.value.courriel;
        const password = this.loginForm.value.password;
        this.authService.login(email, password).subscribe(
          (response) => {
            console.log('Login réussi');
            this.router.navigate(['/accueil']);
            this.resetForm();
          },
          (error) => {
            this.errorMessage.push('Mot de passe ou courriel incorrect.');
            console.log('Erreur de connexion');
          }
        );
      }
    } else {
      this.errorMessage.push('Formulaire invalide.');
      this.resetForm();
    }
  }

  toggleNewUser(): void {
    this.isNewUser = !this.isNewUser;
    if (this.isNewUser) {
      this.loginForm.get('nom')?.setValidators([Validators.required]);
      this.loginForm.get('prenom')?.setValidators([Validators.required]);
    } else {
      this.loginForm.get('nom')?.clearValidators();
      this.loginForm.get('prenom')?.clearValidators();
    }
    this.loginForm.get('nom')?.updateValueAndValidity();
    this.loginForm.get('prenom')?.updateValueAndValidity();
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{10,20}$/;
    const valid = passwordRegex.test(control.value);
    return valid ? null : { invalidPassword: true };
  }

  private resetForm(): void {
    if (this.loginForm) {
      this.loginForm.reset();
    }
  }

  closeModal(): void {
    $(this.loginModal.nativeElement).modal('hide');
  }
}
