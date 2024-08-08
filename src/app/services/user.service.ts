import { Injectable } from '@angular/core';
import { ProfileUser } from '../models/user/user';
import { from, Observable } from 'rxjs';
import { Firestore, doc, updateDoc  } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: Firestore) { }

  updateUser(user: ProfileUser): Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(updateDoc(ref, { ...user }));
  }

}
