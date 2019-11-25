import {Component} from '@angular/core';
import {AuthService} from './auth.service';
import {IUser} from './interfaces/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loggedUser: IUser;

  constructor(public authService: AuthService) {
    this.authService.loggedUserChange$().subscribe((user: IUser) => {
      this.loggedUser = user;
    });
  }

  logout() {
    this.authService.logout();
  }
}
