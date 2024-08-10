import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test-project';
  user$ = this.userService.currentUserProfile$;

  constructor(
    protected _authService: AuthenticationService,
    private userService:UserService
  ) {}

  logout() {
    this._authService.logout();
  }

}
