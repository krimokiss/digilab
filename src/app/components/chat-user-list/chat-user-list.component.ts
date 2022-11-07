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
  showFiller = false;
  isChecked = true
  Amis!: any[]
  FriendSelected!: any


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

    })
    this.searchBar.valueChanges.subscribe((resultSearch: any) => {

      this.NewArray = this.Users.filter((user: any) => {
        return user.firstName.toLowerCase().includes(resultSearch.toLowerCase()) ||
          user.lastName.toLowerCase().includes(resultSearch.toLowerCase())
        // user.location.city.toLowerCase().includes(resultSearch.toLowerCase())
      }
      )
    })

    // this.dataService.getProfile().subscribe((profilUser: any)=>{
    //   this.Profile = profilUser
    //   console.log(profilUser.prenom, profilUser.nom, profilUser.image);
    // })
    this.userService.getProfil().subscribe((profilUser: any) => {
      this.Profile = profilUser
      // console.log(profilUser.firstName, profilUser.lastName, profilUser.avatar);
    })

    // this.userService.getDataUsers().subscribe((utilisateur:any)=>{
    //   this.Profile = utilisateur
    //   console.log(utilisateur.firstName);

    // })
    this.socketService.getFriend().subscribe(response => {
      this.Amis = response
    })
  }

  ajouterAmi(friend: any) {
    this.socketService.addFriend(friend).subscribe(response => {
      console.log(response);
      if (response) {
        this.Amis.push(friend)
        this.snackBar.open("Vous venez d'ajouter  " + this.Amis[this.Amis.length - 1].firstName +' '+ this.Amis[this.Amis.length - 1].lastName + ' ' + "en ami 🥳 🎉. ", '',{duration : 4000, panelClass: ['snack-bar-color']})
        // console.log(this.Amis[this.Amis.length - 1].username );
        this.playAudioSent()
      } else{
        this.snackBar.open("Vous avez deja ajouter :", '', { verticalPosition:"bottom" , duration: 2000, panelClass: ['snack-bar-color'] })
      }

    })
  }
  supprimerAmi(friend:any){
    this.socketService.removeFriend(friend).subscribe(response => {
      
      this.snackBar.open("Vous avez supprimé " + friend.firstName+ ' ' + friend.lastName + " de vos amis ☹️.", '', { duration: 4000,panelClass: ['snack-bar-color'] })
      this.Amis = this.Amis.filter((value:any)=> value.username!==friend.username)
      this.playAudioRemove()
      
    })
    
  }
  playAudioSent(){
    let audio = new Audio();
    audio.src = "assets/addUserSound.wav";
    audio.load();
    audio.play();
  }
  playAudioRemove(){
    let audio = new Audio();
    audio.src = "assets/removeUserSound.wav";
    audio.load();
    audio.play();
  }

  // recupAmi(){
  //   this.socketService.getFriend().subscribe(response=>{
  //     this.Amis = response
  //   })
  // }

  openDialog(user: any): void {
    this.dialog.open(ChatModalComponent, { data: user }).afterClosed().subscribe((responseFromModal: any) => {
      console.log(responseFromModal);
this.FriendSelected = responseFromModal
    })

  }
  // addUsers(): void {
  //   let modal = this.dialog.open(ChatModalComponent)
  //   modal.afterClosed().subscribe((resultFromModal:any)=> this.UserList=[resultFromModal, ...this.UserList])
  // }
  // onClick():void{
  //   // this.userService.getUsers().subscribe((userList: any ) => this.UserList = userList.data)
  //   this.testService.GetUsers().subscribe((usersId:any)=>{
  //     this.Users = usersId.results
  //   })
  // }

}
