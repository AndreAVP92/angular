import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { SecurityService } from '../../security/security.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  @Output() menuToggle = new EventEmitter<void>();
  userStatus!: boolean;
  userSuscription!: Subscription;

  constructor(private securityService: SecurityService) { }

  ngOnInit(): void {
    this.userSuscription = this.securityService.securityChange.subscribe(status => {
      this.userStatus = status
    });
  }

  onMenuToggleDispatch() {
    this.menuToggle.emit();
  }

  logout() {
    this.securityService.logout();
  }

  ngOnDestroy(): void {
    this.userSuscription.unsubscribe();
  }
}
