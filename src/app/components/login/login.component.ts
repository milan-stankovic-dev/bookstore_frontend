import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../../domain/auth/LoginRequest';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

service = inject(AuthService)

form = new FormGroup({
  email: new FormControl('', Validators.required),
  password: new FormControl('', Validators.required)
});

  onSubmit() {
    console.log("Submit attempted!");

    const userEmail = this.form.get('email')?.value;
    const userPassword = this.form.get('password')?.value;

    if(userEmail === undefined || userPassword === undefined) {
      return;
    }

    const requestData: LoginRequest = {
      email: userEmail!,
      password: userPassword!
    }
    alert('Request: ' + JSON.stringify(requestData)); 

    this.service.login(requestData).subscribe({
      next: response => {
        const token = response.token;
        const userID = response.userID;
        alert('User logged in correctly! ' +
            JSON.stringify(token));
        localStorage.setItem('token', token);
        localStorage.setItem('userID', userID.toString());
        
        this.service.navigateToHome();
      },
      error: err => alert(JSON.stringify(err))
    });
  }

}
