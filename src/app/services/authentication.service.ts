import { Injectable } from '@angular/core';
import {Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile,UserInfo} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { concatMap, from, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser$ = authState(this.auth);

  constructor(public auth: Auth, private router: Router) {
  }

  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }

  signUp(email: string | null | undefined, password:  string | null | undefined) {
    return from(createUserWithEmailAndPassword(this.auth, email ? email : '' , password ?? "" ));
    // .pipe(
    //   switchMap(({user})=>updateProfile(user, { displayName: name }))
    // );
  }

  logout() {
    return from(this.auth.signOut().then(() => { this.router.navigate(['/login']); }));
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
