import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DirectoryModalComponent } from 'src/app/modals/directory-modal/directory-modal.component';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit {


  directories: any[]=[]

  constructor(private _dialog:MatDialog,// Pour ouvrir une modale on utilise MatDialog et pour fermer on utilise MatDialogRef
              private router: Router) { }

  ngOnInit(): void {
  }

  addNewDir():void{
   let modal = this._dialog.open(DirectoryModalComponent)
   modal.afterClosed().subscribe((resultFromModal:any)=> this.directories=[resultFromModal, ...this.directories])
  }

  
  
}

