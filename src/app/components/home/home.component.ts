import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {

  user: any;

  constructor(protected _authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.user = this._authService.getCurrentLoginUser();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.user = this._authService.getCurrentLoginUser();
  }

}
