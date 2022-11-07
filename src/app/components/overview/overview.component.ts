import { UserService } from './../../services/user.service';
import { TestService } from './../../services/test.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
Users!: any[] 
lat !: number
lon !: number
status : boolean =false

  constructor(private router: Router,
              private testSerice: TestService,
              private userService : UserService) { }

  ngOnInit(): void {
  
    // this.testSerice.GetUsers().subscribe((usersId:any)=>{
    //   this.Users = usersId.results
    // })
    
    
  }
  clickEvent(){
    this.status = !this.status
  }
  onClick(){
    this.userService.clearToken()}

  getUserLocation() {
    if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(position => {
         this.lat = position.coords.latitude;
         this.lon = position.coords.longitude; console.log(position);
         
         this.testSerice.meteo(this.lat, this.lon).subscribe((DataMeteo:any)=>{
          console.log(DataMeteo);
          
         })
       });
 }else {
    console.log("User not allow")

 }
}

}
