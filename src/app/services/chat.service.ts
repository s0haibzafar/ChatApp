import { Injectable } from '@angular/core';
import { addDoc, Firestore } from '@angular/fire/firestore';
import { ProfileUser } from '../models/user/user';
import { concatMap, map, Observable, take } from 'rxjs';
import { UserService } from './user.service';
import { collection } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private firestore: Firestore,
    protected userService: UserService
  ) { }

  createChat(otherUser:ProfileUser):Observable<string>{
    const  ref = collection(this.firestore, "chats");
    return this.userService.currentUserProfile$.pipe(
      take(1),
      concatMap(user => addDoc(ref, {
         userIds : [user?.uid, otherUser.uid],
         users : [
          {
            displayName: user?.displayName??  '',
            photoURL: user?.photoURL??  '',
          },
          {
            displayName: otherUser?.displayName??  '',
            photoURL: otherUser?.photoURL??  '',
          },
         ]
      })),
      map(ref => ref.id)
    );
  }
}
