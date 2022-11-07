import { TestService } from './../../services/test.service';
import { UserService } from './../../services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.scss']
})
export class ChatModalComponent implements OnInit {



  constructor(@Inject(MAT_DIALOG_DATA)
              public dataUser:any,
              private userService: UserService,
              private testService: TestService,
              private dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
    // console.log(this.dataUser);
   
    
  }

  onClickoff(){
    this.dialogRef.close(this.dataUser)
  }
  // onClick(){
  //   this.userService.setCurrentUser(this.dataUser)
  //   this.dialogRef.close(this.dataUser)
  // }
  onClick(){
    this.testService.setCurrentUser(this.dataUser)
    this.dialogRef.close(this.dataUser)
  }
 
}
