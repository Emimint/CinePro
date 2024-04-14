import { Component } from '@angular/core';
import{ FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  loginForm?: any;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
            courriel: ['', [Validators.required, Validators.email]],      
            password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }


  submitForm1(): void {
    if (this.loginForm?.valid) {
      console.log('Form data:', this.loginForm.value);
    }
  }

}
