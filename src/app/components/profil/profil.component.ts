import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

profile!: any

  constructor(private router:Router,
              private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getProfil().subscribe((profilUser:any)=>{
      this.profile = profilUser
      console.log(this.profile);
      
    })
  }
}
