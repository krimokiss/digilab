// import { ChatUserListComponent } from './../chat-user-list/chat-user-list.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Socket } from 'ngx-socket-io';
import { SocketService } from './../../services/socket.service';
import { FormControl } from '@angular/forms';
import { DataService } from './../../services/data.service';
import { TestService } from './../../services/test.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { timer, map } from 'rxjs';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {

  blagues!: any
  utilisateur!: any
  newBlagues: FormControl = new FormControl()
  @ViewChild('scrollMe') scroll!: ElementRef

  message = '';
  showEmojiPicker = false;
  sets = [
    'native',
    'google',
    'twitter',
    'facebook',
    'emojione',
    'apple',
    'messenger'
  ]
  set = 'twitter';
  toggleEmojiPicker() {
    console.log(this.showEmojiPicker);
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  constructor(private dataService: DataService,
    private testService: TestService,
    private socketService: SocketService,
    private snackBar: MatSnackBar) { }

  socket!: Socket
  msgSent!: any
  msgReceived!: any
  mergeArray!: any
  dateMessage!: any
  dateFiltered!: any

  messageDirect = {
    content: '',
    date: '',
    friendID: { _id: '', username: '' },
    userID: { _id: '', username: '' },
    __v: '',
    _id: ''
  }


  messageSocket = {
    content: '',
    friendID: '',
    userID: '',

  }

  receivedMessage = {
    content: '',
    date: '',
    friendID: { _id: '', username: '' },
    userID: { _id: '', username: '' },
    __v: '',
    _id: ''
  }

  ngOnInit(): void {
    this.testService.getCurrentUser().subscribe((valueA: any) => {
      console.warn(valueA);
      this.utilisateur = valueA

      this.socketService.getNewRouteMessage(this.utilisateur.username).subscribe((value: any) => {

        this.dateFiltered = value
        // console.log(this.dateFiltered);

      })
    })

    this.socketService.initConversation()
  

    this.socketService.getMsgSubject().subscribe((message: any) => {
      console.log(message);
      this.messageDirect = message
      this.dateFiltered.push(this.messageDirect)
    
    })

    this.socketService.getMessageOnline()

    this.socketService.getMsgOnlineSubject().subscribe((message: any) => {

      this.dateFiltered.push(message)
      // console.log(message);

      if (this.utilisateur.username !== message.userID.username) {
        this.snackBar.open('Message de : ' + message.userID.username + ' .' + ' .'+ ' .'+ ' Contenu : ' +' '+ message.content, 'ok',
        { duration : 6000, verticalPosition: 'top', panelClass: ['snack-bar-color'] })
        this.playAudio()
        console.log(this.utilisateur);
        console.log(message);
        
        
      }
    
      // console.log(message);
      // console.log(this.utilisateur);

    })
    this.socketService.getMessages()

  }
  playAudio(){
    let audio = new Audio();
    audio.src = "assets/msgSound.wav";
    audio.load();
    audio.play();
  }
 

  ngAfterViewChecked() {
    this.scrollToBottom()
  }

  onSend(): void {
   
    const valueForm = this.newBlagues.value
    this.socketService.sendMessage(this.utilisateur, valueForm)
    this.newBlagues.reset()
  }

  Send(event: KeyboardEvent) {
    if (event.code === "Enter") {
      this.onSend()
    }
  }
  addEmoji(event: any) {
    const { message } = this;
    // console.log(message);
    // console.log(`${event.emoji.native}`)
    const text = `${message}${event.emoji.native}`;

    this.message = text;
    this.showEmojiPicker = false;
  }

  onFocus() {
    // console.log('focus');
    this.showEmojiPicker = false;
  }
  // onBlur() {
  //   console.log('onblur')
  // }
  scrollToBottom() {
    try {
      this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight
    } catch (error) {

    }
  }


}
