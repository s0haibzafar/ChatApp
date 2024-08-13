import { Injectable } from '@angular/core';
import { ProfileUser } from '../models/user/user';
import { from, Observable, of, switchMap } from 'rxjs';
import { Firestore, collectionData, doc, docData, query, setDoc, updateDoc  } from '@angular/fire/firestore'
import { AuthenticationService } from './authentication.service';
import { collection } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: Firestore, private authService : AuthenticationService) { }

  get currentUserProfile$(): Observable<ProfileUser | null> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<ProfileUser>;
      })
    );
  }
  
  addUser(user: ProfileUser): Observable<void> {
    const ref = doc(this.firestore, 'users', user?.uid ?? "");
    return from(setDoc(ref, user));
  }

  updateUser(user: ProfileUser): Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(updateDoc(ref, { ...user }));
  }
  
  //chat
   get allUsers$():Observable<ProfileUser[]> {
    const ref = collection(this.firestore, "users");
    const queryAll = query(ref);
    return collectionData(queryAll) as Observable<ProfileUser[]>;
   }

}
