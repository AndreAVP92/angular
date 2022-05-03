import { Subject } from 'rxjs';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';

import { User } from './user.model';
import { LoginData } from './login-data.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private token!: string;
  baseUrl = environment.baseUrl;
  securityChange = new Subject<boolean>();
  private user!: User;

   loadUser(): void {
     const tokenBrowser = localStorage.getItem('token');
     if(!tokenBrowser) {
      return;
     }
     this.token = tokenBrowser;
     this.securityChange.next(true);

     this.http.get<User>(this.baseUrl + 'user')
      .subscribe((response) => {
        console.log('login response: ', response);

        this.token = response.token;
        this.user = {
          email: response.email,
          name: response.name,
          lastName: response.lastName,
          token: response.token,
          password: '',
          username: response.username,
          userId: response.userId
        };
        this.securityChange.next(true);
        localStorage.setItem('token', response.token);
      });

   }

  getToken(): string {
    return this.token;
  }

  constructor(private router: Router, private http: HttpClient) {}

  registerUser(user: User): void {
    this.http.post<User>(this.baseUrl + 'user/register', user)
    .subscribe((response) => {
      console.log('login response: ', response);

      this.token = response.token;
      this.user = {
        email: response.email,
        name: response.name,
        lastName: response.lastName,
        token: response.token,
        password: '',
        username: response.username,
        userId: response.userId
      };
      this.securityChange.next(true);
      localStorage.setItem('token', response.token);
      this.router.navigate(['/']);
    });

    // this.user = {
    //   email: user.email,
    //   userId: Math.round(Math.random() * 10000).toString(),
    //   name: user.name,
    //   lastName: user.lastName,
    //   username: user.username,
    //   password: '',
    //   token: ''
    // };

    // this.securityChange.next(true);
    // this.router.navigate(['/']);
  }

  login(loginData: LoginData) {
    this.http.post<User>(this.baseUrl + 'user/login', loginData)
      .subscribe((response) => {
        console.log('login response: ', response);
        this.token = response.token;
        this.user = {
          email: response.email,
          name: response.name,
          lastName: response.lastName,
          token: response.token,
          password: '',
          username: response.username,
          userId: response.userId
        };
        this.securityChange.next(true);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/']);
      });
  }

  logout() {
    this.user = null!;
    this.securityChange.next(false);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getUser() {
    return {...this.user};
  }

  onSession() {
    return this.token != null;
  }
}
