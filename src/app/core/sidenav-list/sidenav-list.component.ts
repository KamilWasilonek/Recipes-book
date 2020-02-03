import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

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
    console.log(1);
    this.authService.logoutUser();
    console.log(5);
    this.sidenavClose.emit();
    console.log(6);
  }
}
