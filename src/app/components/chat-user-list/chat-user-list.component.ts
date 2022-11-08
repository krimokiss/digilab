import { User } from './../../models/user';
import { TestService } from './../../services/test.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SocketService } from './../../services/socket.service';
import { UserService } from './../../services/user.service';
import { DataService } from './../../services/data.service';
import { FormControl } from '@angular/forms';
import { ChatModalComponent } from './../../modals/chat-modal/chat-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-user-list',
  templateUrl: './chat-user-list.component.html',
  styleUrls: ['./chat-user-list.component.scss']
})
export class ChatUserListComponent implements OnInit {

  Profile!: any
  Users: any
  NewArray!: any[]
  searchBar: FormControl = new FormControl()
  searchAmi: FormControl = new FormControl()
  showFiller = false;
  isChecked = true
  Amis!: any[]
  FriendSelected!: any
  badgeCount!: number
  userConnected!: any
  msgBadge = {
    avatar: '',
    sirstName: '',
    lastName: '',
    nbMsg: '',
    online: '',
    username: '',
    _id: ''
  }



  constructor(private dialog: MatDialog,
    private testService: TestService,
    private userService: UserService,
    private socketService: SocketService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userService.getUsersList().subscribe((usersId: any) => {
      this.Users = usersId.body
      this.NewArray = [...this.Users]
      // console.log(this.NewArray);
      this.NewArray = this.NewArray.filter(value => value.username != this.Profile.username)
      // console.log(this.NewArray);
      // console.log(this.Users);
      this.socketService.getOnlineUsers().subscribe((users: any) => {
        this.userConnected = users

        // console.log(this.userConnected);
        this.NewArray.forEach((ami: any) => {
          if ((this.userConnected).includes(ami.username)) {
            ami.online = true
          } else {
            ami.online = false
          }
        })
        this.NewArray = this.NewArray.sort((a: any, b: any) => {
          return b.online - a.online
        })

        this.Amis.forEach((ami: any) => {
          if ((this.userConnected).includes(ami.username)) {
            ami.online = true
          } else {
            ami.online = false
          }
        })
        this.Amis = this.Amis.sort((a: any, b: any) => {
          return b.online - a.online
        })
      })

      this.Users.map((user: User) => {
        user.avatar = user.avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
        return user
      })

    })
    this.socketService.logUsers()

    this.searchBar.valueChanges.subscribe((resultSearch: any) => {

      this.NewArray = this.Users.filter((user: any) => {
        return user.firstName.toLowerCase().includes(resultSearch.toLowerCase()) ||
          user.lastName.toLowerCase().includes(resultSearch.toLowerCase())
        // user.location.city.toLowerCase().includes(resultSearch.toLowerCase())
      }
      )
    })
    this.searchAmi.valueChanges.subscribe((resultSearchAmi: any) => {

      this.Amis = this.Users.filter((user: any) => {
        return user.firstName.toLowerCase().includes(resultSearchAmi.toLowerCase()) ||
          user.lastName.toLowerCase().includes(resultSearchAmi.toLowerCase())
        // user.location.city.toLowerCase().includes(resultSearch.toLowerCase())
        
      }
      )
    })

    this.userService.getProfil().subscribe((profilUser: any) => {
      this.Profile = profilUser
      // console.log(profilUser.firstName, profilUser.lastName, profilUser.avatar);
    })

    this.socketService.getMsgOnlineSubject().subscribe((message: any) => {

      this.Amis.forEach((user: any) => {
        if (this.msgBadge.username !== this.FriendSelected.username) {
          if (user.username == message.userID.username) {
            if (user.nbMsg) {
              user.nbMsg = user.nbMsg + 1
            } else {
              user.nbMsg = 1
            }
            this.msgBadge = user
            console.log(this.msgBadge);
          }
        }
      })
      // this.NewArray.forEach((user:any)=>{
      //   if (user.username==message.userID.username) {
      //     if (user.nbMsg) {
      //       user.nbMsg = user.nbMsg+1

      //     } else{
      //       user.nbMsg = 1
      //     }
      //    this.msgBadge = user
      //     console.log(this.msgBadge);

      //   }
      // })
    })
    this.socketService.getFriend().subscribe(response => {
      this.Amis = response


    })

  }

  ajouterAmi(friend: any) {
    this.socketService.addFriend(friend).subscribe(response => {
      console.log(response);
      if (response) {
        this.Amis.push(friend)
        this.snackBar.open("Vous venez d'ajouter  " + this.Amis[this.Amis.length - 1].firstName + ' ' + this.Amis[this.Amis.length - 1].lastName + ' ' + "en ami 🥳 🎉. ", '', { duration: 4000, panelClass: ['snack-bar-color'] })
        // console.log(this.Amis[this.Amis.length - 1].username );
        this.playAudioSent()
      } else {
        this.snackBar.open("Vous avez deja ajouter :", '', { verticalPosition: "bottom", duration: 2000, panelClass: ['snack-bar-color'] })
      }

    })
  }
  supprimerAmi(friend: any) {
    this.socketService.removeFriend(friend).subscribe(response => {

      this.snackBar.open("Vous avez supprimé " + friend.firstName + ' ' + friend.lastName + " de vos amis ☹️.", '', { duration: 4000, panelClass: ['snack-bar-color'] })
      this.Amis = this.Amis.filter((value: any) => value.username !== friend.username)
      this.playAudioRemove()
    })

  }
  playAudioSent() {
    let audio = new Audio();
    audio.src = "assets/addUserSound.wav";
    audio.load();
    audio.play();
  }
  playAudioRemove() {
    let audio = new Audio();
    audio.src = "assets/removeUserSound.wav";
    audio.load();
    audio.play();
  }

  openDialog(user: any): void {
    this.dialog.open(ChatModalComponent, { data: user }).afterClosed().subscribe((responseFromModal: any) => {
      console.log(responseFromModal);
      this.FriendSelected = responseFromModal
      if (this.msgBadge.username == this.FriendSelected.username) {
        this.clearCount()
      }
    })

  }


  clearCount() {
    this.msgBadge.nbMsg = '';
  }


}
