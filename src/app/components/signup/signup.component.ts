import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';

export function passwordMatchValidator(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
     const password = control.get('password');
     const confirmPassword = control.get('confirmPassword');

     if(password && confirmPassword && password.value !== confirmPassword.value){
      return{
        passwordDontMatch: true
      };
     }

    return null;
  };

}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  }, { validators: passwordMatchValidator()  });

  constructor( 
    protected _authService: AuthenticationService,
    protected router: Router,
    private toast: HotToastService
  ) { }

  ngOnInit(): void {
  }

  Submit(){
    if (!this.signUpForm.valid) {
      return;
    }

    const { name, email, password } = this.signUpForm.value;
    this._authService.signUp(name ? name : '',  email ? email : '', password ? password : '').pipe(
      this.toast.observe({
        success: "Congrates! you are signUp ",
        loading: "Signing Up...",
        error: ({ message }) => `${message}`,
      })
    ).subscribe(() => {
      this.router.navigate(['/home']);
    });
    
  }

  get name(){
    return this.signUpForm.get("name");
  }

  get email(){
    return this.signUpForm.get("email");
  }

  get password(){
    return this.signUpForm.get("password");
  }

  get confirmPassword(){
    return this.signUpForm.get("confirmPassword");
  }

}
