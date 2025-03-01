import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, RedirectableRoutes } from '../../services/auth.service';
import { RegisterRequest } from '../../domain/auth/RegisterRequest';
import { UserRoles } from '../../domain/auth/userRole';
import { LoginRequest } from '../../domain/auth/LoginRequest';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss',
    '../auth_styles/auth.scss']
})
export class RegisterComponent {
  submitted = false;
  authService = inject(AuthService);
  errorService = inject(ErrorService);

  onSubmit() {
    console.log('Submit attempted!');

    const userName = this.form.get('name')?.value;
    const userLastName = this.form.get('lastName')?.value;
    const userEmail = this.form.get('email')?.value;
    const userPassword = this.form.get('password')?.value;

    if(this.form.invalid) {
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
            this.submitted = true;
             localStorage.setItem('token', response.token);
             localStorage.setItem('userID', response.userID.toString());
          
             this.authService.navigateTo(RedirectableRoutes.HOME, 2000);
          },
          error: err => {
            alert(`Could not login after successful registration. Error: 
              ${err.error.errors[0]}`);
              
            this.authService.navigateTo(RedirectableRoutes.LOGIN, 3500);
          }
        })
      },
      error : err => {
        this.errorService.displayErrorMessage(err);
      }
    })

  }
  form = new FormGroup({
    name: new FormControl('', 
      [Validators.required,Validators.nullValidator, Validators.minLength(1)]),
    lastName: new FormControl('', 
      [Validators.required,Validators.nullValidator, Validators.minLength(1)]),
    email: new FormControl('', 
      [Validators.required,Validators.nullValidator, Validators.minLength(1)]),
    password: new FormControl('', 
      [Validators.required,Validators.nullValidator, Validators.minLength(1)])
  });
}
