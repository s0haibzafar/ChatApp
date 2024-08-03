import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test-project';
  user:any

  constructor(protected _authService: AuthenticationService,) {
    this._authService.isLoggedIn !== true
    this.user =  this._authService.getCurrentLoginUser();
  }

  logout() {
    this._authService.logout();
  }

}
