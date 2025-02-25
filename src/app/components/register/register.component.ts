import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, RedirectableRoutes } from '../../services/auth.service';
import { RegisterRequest } from '../../domain/auth/RegisterRequest';
import { UserRoles } from '../../domain/auth/userRole';
import { response } from 'express';
import { LoginRequest } from '../../domain/auth/LoginRequest';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  authService = inject(AuthService);

  onSubmit() {
    console.log('Submit attempted!');

    const userName = this.form.get('name')?.value;
    const userLastName = this.form.get('lastName')?.value;
    const userEmail = this.form.get('email')?.value;
    const userPassword = this.form.get('password')?.value;

    if(userName  === undefined || userLastName === undefined ||
       userEmail === undefined || userPassword === undefined) {
        console.log('NAME ', userName, ' LAST NAME ', userLastName,
          ' EMAIL ', userEmail, ' PASSWORD ', userPassword);
        alert('Please fill in all fields then try again.');
        return;
    }

    const registerRequest: RegisterRequest = {
      name: userName!,
      lastName: userLastName!,
      email: userEmail!,
      password: userPassword!,
      role: UserRoles.USER
    }

    const loginRequest: LoginRequest = {
      email: userEmail!,
      password: userPassword!
    }

    this.authService.register(registerRequest).subscribe({
      next: response => {
        alert('You have registered successfully!');

        this.authService.login(loginRequest).subscribe({
          next: response => {
             localStorage.setItem('token', response.token);
             localStorage.setItem('userID', response.userID.toString());
          
             this.authService.navigateTo(RedirectableRoutes.HOME, 2000);
          },
          error: err => {
            alert(`Could not login after successful registration. Error: 
              ${JSON.stringify(err)}`)

            this.authService.navigateTo(RedirectableRoutes.LOGIN, 3500);
          }
        })
      },
      error : err => {
        alert(`REGISTRATION FAILED! ${JSON.stringify(err)}`);
      }
    })

  }
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
}
