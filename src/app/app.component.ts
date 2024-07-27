import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test-project';

  constructor(protected _authService: AuthenticationService,) {
    this._authService.isLoggedIn !== true
  }

  logout() {
    this._authService.logout();
  }

}
