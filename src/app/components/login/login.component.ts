import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../../domain/auth/LoginRequest';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

form = new FormGroup({
  email: new FormControl('', Validators.required),
  password: new FormControl('', Validators.required)
});

  onSubmit() {
    console.log("Submit attempted!");

    // const requestData = new LoginRequest(
    //   this.form.get('email'),
    //   this.form.get('password')
    // )

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
  }

}
