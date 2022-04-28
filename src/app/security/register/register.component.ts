import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private securityService: SecurityService) { }

  ngOnInit(): void {
  }

  registerUser(form: NgForm){
    this.securityService.registerUser({
      email: form.value.email,
      password: form.value.password,
      lastName: form.value.lastName,
      name: form.value.name,
      username: form.value.username,
      userId: form.value.userId
    });
  }
}
