import { ProfileUser } from "../user/user";

export interface Chat{

    id:string;
    lastMessage?:string;
    lastMessageDate?:Date;
    userIds:string[];
    users:ProfileUser[];
    //only for display
    chatPic?: string;
    chatName?: string;
}

export interface Message{
    text: string;
    senderId: string;
    sentDate: Date;
}