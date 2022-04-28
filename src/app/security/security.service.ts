import { Subject } from 'rxjs';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';

import { User } from './user.model';
import { LoginData } from './login-data.model';

@Injectable()
export class SecurityService {
  securityChange = new Subject<boolean>();
  private user!: User;

  constructor(private router: Router) {}

  registerUser(user: User) {
    this.user = {
      email: user.email,
      userId: Math.round(Math.random() * 10000).toString(),
      name: user.name,
      lastName: user.lastName,
      username: user.username,
      password: ''
    };

    this.securityChange.next(true);
    this.router.navigate(['/']);
  }

  login(loginData: LoginData) {
    this.user = {
      email: loginData.email,
      userId: Math.round(Math.random() * 10000).toString(),
      name: '',
      lastName: '',
      username: '',
      password: ''
    };
    this.securityChange.next(true);
    this.router.navigate(['/']);
  }

  logout() {
    this.user = null!;
    this.securityChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return {...this.user};
  }

  onSession() {
    return this.user != null;
  }
}
