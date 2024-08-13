import { Injectable } from '@angular/core';
import { addDoc, collectionData, Firestore } from '@angular/fire/firestore';
import { ProfileUser } from '../models/user/user';
import { concatMap, map, Observable, take } from 'rxjs';
import { UserService } from './user.service';
import { collection, query, where } from 'firebase/firestore';
import { Chat } from '../models/chat/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private firestore: Firestore,
    protected userService: UserService
  ) { }

  createChat(otherUser: ProfileUser): Observable<string> {
    const ref = collection(this.firestore, "chats");
    return this.userService.currentUserProfile$.pipe(
      take(1),
      concatMap(user => addDoc(ref, {
        userIds: [user?.uid, otherUser.uid],
        users: [
          {
            displayName: user?.displayName ?? '',
            photoURL: user?.photoURL ?? '',
          },
          {
            displayName: otherUser?.displayName ?? '',
            photoURL: otherUser?.photoURL ?? '',
          },
        ]
      })),
      map(ref => ref.id)
    );
  }

  get myChats$(): Observable<Chat[]> {
    const ref = collection(this.firestore, 'chats');
    return this.userService.currentUserProfile$.pipe(
      concatMap((user) => {
        const myQuery = query(ref, where('userIds', 'array-contains', user?.uid))
        return collectionData(myQuery, { idField: 'id' }).pipe(
          map(chats => this.addChatNameAndPic(user?.uid ?? '', chats as Chat[]))
        ) as Observable<Chat[]>;
      })
    );

  }

  addChatNameAndPic(currentUserId: string, chats: Chat[]): Chat[] {
    chats.forEach(chat => {
      const otherIndex = chat.userIds.indexOf(currentUserId) === 0 ? 1 : 0;
      const { displayName, photoURL } = chat.users[otherIndex];
      chat.chatName = displayName;
      chat.chatPic = photoURL;
    });
    return chats;
  }

}
