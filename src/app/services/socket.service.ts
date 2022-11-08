import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket,
    private http: HttpClient) {

  }

  urlAllMessages = `${environment.API_URL}api/messages/friendmessages`

  getMessageSubject = new Subject()
  sendMessagesSubject = new Subject()
  getMessageOnlineSubject = new Subject()
  logUsersSubject = new Subject()
  usersConnecet !: any

  getFriendMessage(): Observable<any> {
    return this.http.get(this.urlAllMessages)
  }

  initConversation() {
    this.socket.emit('login', { token: UserService.getToken() })
  }
  logUsers(): void {
    this.socket.on('users list', (usersOnline: any) => {
      // console.log(usersOnline);
      this.logUsersSubject.next(usersOnline)
      this.usersConnecet = usersOnline
      // console.log(this.usersConnecet);
      
    })
  }
  getOnlineUsers(){
    return this.logUsersSubject.asObservable()
  }
  addFriend(friend: any) {
    return this.http.post(`${environment.API_URL}api/users/addfriend`, { "friendName": friend.username })
  }
  getFriend(): Observable<any> {
    return this.http.get(`${environment.API_URL}api/users/friends`)
  }
  removeFriend(friend: any) {
    return this.http.post(`${environment.API_URL}api/users/removefriend`, { "friendName": friend.username })
  }
  messageSent() {
    return this.http.get(`${environment.API_URL}api/messages`)
  }

  getMessages() {
    this.socket.on('friend message sent', (data: any) => {
      this.getMessageSubject.next(data)
      // console.log(data)
    })
  }

  getMsgSubject() {
    return this.getMessageSubject.asObservable()
  }

  sendMessage(user: any, message: string) {
    this.socket.emit('send friend message', { friendName: user.username, content: message })
  }
  getMessageOnline(): any {
    this.socket.on('friend message', (messages: any) => {
      this.getMessageOnlineSubject.next(messages)
      console.warn('message recu en ligne', messages);
      //return messages
    })
  }

  getMsgOnlineSubject() {
    return this.getMessageOnlineSubject.asObservable()
  }

  getNewRouteMessage(friendName: string) {
    return this.http.get(`${environment.API_URL}api/messages/friendmessages/${friendName}`)
  }

}
