import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { SecurityService } from '../../security/security.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit, OnDestroy {
  @Output() menuToggle = new EventEmitter<void>();
  userStatus!: boolean;
  userSuscription!: Subscription;

  constructor(private securityService: SecurityService) { }

  ngOnInit(): void {
    this.userSuscription = this.securityService.securityChange.subscribe(status => {
      this.userStatus = status
    });
  }

  onCloseMenu() {
    this.menuToggle.emit();
  }

  endSessionMenu() {
    this.onCloseMenu();
    this.securityService.logout();
  }

  ngOnDestroy(): void {
    this.userSuscription = this.securityService.securityChange.subscribe(status => {
      this.userStatus = status
    });
  }
}
