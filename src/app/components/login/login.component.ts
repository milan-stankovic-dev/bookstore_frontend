import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../../domain/auth/LoginRequest';
import { AuthService, RedirectableRoutes } from '../../services/auth.service';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss',
     '../auth_styles/auth.scss']
})
export class LoginComponent {
submitted = false;
service = inject(AuthService);
errorService = inject(ErrorService);

form = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.nullValidator, Validators.minLength(1)]),
  password: new FormControl('', [Validators.required, Validators.nullValidator, Validators.minLength(1)])
});

  onSubmit() {
    
    console.log("Submit attempted!");

    const userEmail = this.form.get('email')?.value;
    const userPassword = this.form.get('password')?.value;

      if(this.form.invalid) {
        console.log(
          'EMAIL ', userEmail, ' PASSWORD ', userPassword);
        alert('Please fill in all fields then try again.');
        return;
    }

    const requestData: LoginRequest = {
      email: userEmail!,
      password: userPassword!
    }

    this.service.login(requestData).subscribe({
      next: response => {
        this.submitted = true;
        const token = response.token;
        const userID = response.userID;
        alert('You have logged in correctly!');
        console.log(JSON.stringify(response));
        
        localStorage.setItem('token', token);
        localStorage.setItem('userID', userID.toString());
        
        this.service.navigateTo(RedirectableRoutes.HOME, 2000);
      },
      error: err => this.errorService.displayErrorMessage(err)
    });
  }

}
