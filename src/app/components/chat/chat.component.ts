import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, map, startWith } from 'rxjs';
import { ProfileUser } from 'src/app/models/user/user';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  searchControl = new FormControl('');

  user$ = this.userService.currentUserProfile$;
  // users$ = this.userService.allUsers$;
  users$ = combineLatest([
    this.userService.allUsers$,
    this.user$,
    this.searchControl.valueChanges.pipe(startWith(''))
  ]).pipe(
    map(([users, user, searchString]) =>
      users.filter(u =>
        u?.displayName?.toLowerCase().includes((searchString ?? '').toLowerCase())
        && u.uid !== user?.uid
      )
    )
  );


  myChats$ = this.chatService.myChats$;
   
  constructor(private userService: UserService,
    private chatService: ChatService
  ) { 
    
  }

  ngOnInit(): void {
  }

  createChat(otherUser: ProfileUser) {
    this.chatService.createChat(otherUser).subscribe();
  }

}
