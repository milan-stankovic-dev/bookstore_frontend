import { Component, inject, OnInit } from '@angular/core';
import { AuthService, RedirectableRoutes } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent implements OnInit {
  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.logout();
    this.authService.navigateTo(RedirectableRoutes.HOME, 0);
  }

}