import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  users: Array<string> = ['André', 'Fátima', 'Molly'];
  username: string = '';
  visible: boolean = false;

  constructor() {
    setTimeout(() => {
      this.visible = true;
    }, 3000);
  }

  ngOnInit(): void {
  }

  addUser() {
    this.users.push(this.username);
  }

}
