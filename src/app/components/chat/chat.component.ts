import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, filter, map, startWith, switchMap, tap } from 'rxjs';
import { ProfileUser } from 'src/app/models/user/user';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @ViewChild("endOfChat") endOfChat!: ElementRef; 

  searchControl = new FormControl('');
  chatListControl = new FormControl('');
  messageControl = new FormControl('');

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
  
  selectedChat$ = combineLatest([ 
    this.chatListControl.valueChanges,
    this.myChats$
  ]).pipe(
    map(([value, chats]) => 
      chats.find(c => 
        c.id === (value && value[0])
      )
    )
  );
  
  messages$= this.chatListControl.valueChanges.pipe(
    map(value => value?.[0]),
    switchMap(chatId => this.chatService.getChatMessages$(chatId? chatId : '123' )),
    tap(()=>{
      this.scrollToBottom();
    })
  );

  constructor(private userService: UserService,
    private chatService: ChatService
  ) { 
    
  }

  ngOnInit(): void {
  }

  createChat(otherUser: ProfileUser) {
    this.chatService.createChat(otherUser).subscribe();
  }

  sendMessage(){
    const message = this.messageControl.value;
    const selectedChatId = this.chatListControl.value?.[0];

    if(message && selectedChatId){
      this.chatService.addChatMessage(selectedChatId, message).subscribe(()=>{
        this.scrollToBottom();
      });
      this.messageControl.setValue('');
    }
  }

  scrollToBottom(){
    setTimeout(()=>{
      if(this.endOfChat){
        this.endOfChat.nativeElement.scrollIntoView({behaviour: "smooth"})
      }
    }, 100);
  }

}
