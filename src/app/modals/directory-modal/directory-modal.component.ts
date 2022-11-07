import { UserService } from './../../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-directory-modal',
  templateUrl: './directory-modal.component.html',
  styleUrls: ['./directory-modal.component.scss']
})
export class DirectoryModalComponent implements OnInit {

directoryForm!: FormGroup


  constructor(private _fb : FormBuilder,
              private _directoryService : UserService,
              private _dialogRef: MatDialogRef<any>// pour fermer la modale et éventuellement passer des data à notre Component Parent 
              ) { }

  ngOnInit(): void {
   
    this.directoryForm =this._fb.group({
      nom:['', Validators.minLength(2)],
      chemin:['', [Validators.required, Validators.pattern('[a-zA-Z0-9&?-_.]{2,}\/+')]],
      description: ['', Validators.minLength(10)]
    })
  }
  onSubmit(){
    this._directoryService
    .postData(this.directoryForm.value)
    .subscribe((responseFromServer:any)=>{
      this._dialogRef.close(responseFromServer)
    })
  }
}
