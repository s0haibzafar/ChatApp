import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  reactiveLoginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    protected _authService: AuthenticationService,
    private router: Router,
    private toast: HotToastService) { }

  ngOnInit(): void {
  }

  get email() {
    return this.reactiveLoginForm.get("email");
  }

  get password() {
    return this.reactiveLoginForm.get("password");
  }

  Submit() {
    if (!this.reactiveLoginForm.valid) {
      return;
    }

    const { email, password } = this.reactiveLoginForm.value;
    this._authService.login(email ? email : '', password ? password : '').pipe(
      this.toast.observe({
        success: "Logged in successfully",
        loading: "Logging in...",
        error: "There was an error",
      })
    ).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

}
