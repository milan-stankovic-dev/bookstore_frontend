import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../domain/auth/LoginRequest';
import { TokenResponse } from '../domain/auth/tokenResponse';
import { RegisterRequest } from '../domain/auth/RegisterRequest';
import { AppUser } from '../domain/auth/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_URL = 'http://localhost:8080/auth';
  http = inject(HttpClient);
  
  public login(request: LoginRequest) : Observable<TokenResponse> {
    return this.http.post<TokenResponse>(this.AUTH_URL + '/login', request);
  }

  public register(request: RegisterRequest) : Observable<AppUser> {
    return this.http.post<AppUser>(this.AUTH_URL + '/register', request);
  }

  constructor() { }
}
