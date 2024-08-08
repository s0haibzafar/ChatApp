import { Injectable } from '@angular/core';
import {Auth, authState, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile,UserInfo} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { concatMap, from, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  UserData = authState(this.auth);
  currentUser$ = authState(this.auth);

  //UserData: any;

  constructor(public auth: Auth, private router: Router) {
    onAuthStateChanged(this.auth, (user: any) => {
      if (user) {
        this.UserData = user;
        localStorage.setItem('user', JSON.stringify(this.UserData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    })
  }



  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }

  signUp(name: string, email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(({user})=>updateProfile(user, { displayName: name }))
    );
  }

  logout() {
    return from(this.auth.signOut().then(() => { this.router.navigate(['/login']); }));
  }

  //Check wither User Is looged in or not
  get isLoggedIn(): boolean {
    const token = localStorage.getItem('user')
    const user = JSON.parse(token as string);
    return user !== null ? true : false;
  }

  getCurrentLoginUser(){
    const token = localStorage.getItem('user')
    const user = JSON.parse(token as string);
    console.log("1-----------------> ",user)
    return user;
  }


  updateProfileData(profileData: Partial<UserInfo>): Observable<any> {
    const user = this.auth.currentUser;
    return of(user).pipe(
      concatMap((user) => {
        if (!user) throw new Error('Not authenticated');

        return updateProfile(user, profileData);
      })
    );
  }

}
