import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authService = inject(AuthService)

  paths: Array<string> = [
    "home",
    "books",
    "cart",
    "login",
    "logout"
  ]

  isUserLoggedIn() : Boolean{
    return this.authService.isUserLoggedIn();
  }
}
