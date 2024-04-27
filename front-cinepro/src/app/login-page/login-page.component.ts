import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  loginForm?: FormGroup;
  isNewUser: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      courriel: ['', [Validators.required, Validators.email]],
      // DECOMMENTER LES LIGNES SUIVANTES POUR ACTIVER LES VALIDATIONS DU MOT DE PASSE !!!!!
      // password: ['', [Validators.required, this.passwordValidator]],
      password: [''],
      nom: ['', [Validators.minLength(3)]],
      prenom: ['', [Validators.minLength(3)]],
    });
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      if (this.isNewUser) {
        this.authService
          .register(
            this.loginForm.value.nom,
            this.loginForm.value.prenom,
            this.loginForm.value.courriel,
            this.loginForm.value.password
          )
          .subscribe(
            (response) => {
              console.log('Enregistrement réussi');
              this.resetForm();
            },
            (error) => {
              console.log("Erreur lors de l'enregistrement.");
            }
          );
      } else {
        const email = this.loginForm.value.courriel;
        const password = this.loginForm.value.password;
        this.authService.login(email, password).subscribe(
          (response) => {
            console.log('Login réussi');
            this.resetForm();
          },
          (error) => {
            console.log('Erreur de connexion');
          }
        );
      }
    } else {
      console.log('Formulaire invalide');
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
}
