import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss'],
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  logout() {
    this.authService.logoutUser();
    this.sidenavClose.emit();
  }

  close() {
    this.sidenavClose.emit();
  }
}
