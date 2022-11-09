import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { TestService } from '../../../services/test.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  inscription = new FormControl('');
  loginForm!: FormGroup;
  emailRegex!: RegExp;
  passwordregex!: RegExp;
  profileForm!: FormGroup;
  user = new User()



  constructor(private formbuilder: FormBuilder,
    private http : HttpClient,
    private router: Router,
    private userService : UserService,
    private snackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/
    this.passwordregex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    this.loginForm = this.formbuilder.group({
      email: [this.user.email, [Validators.required, Validators.pattern(this.emailRegex)]],
      password: [this.user.password, [Validators.required]],

    });

  }
 
  onSubmit() {
    // const str = this.profileForm.value.utilisateur;
    // const arobase = str.split('@');
    // const words = arobase[0].split('.');
    // console.log(words);
    
    const form = this.loginForm.value

    this.user = Object.assign(this.user, form) 
 
    this.userService.postUsersLogin(this.user).subscribe((result:User)=>{
      if (result){

          localStorage.setItem('token',(result.token))
          // console.log(result.token);
          this.router.navigate(['overview'])

      }
     
    }
    )

    // this.testService.GetUsers().subscribe((user: any) => {
    //   user.results[2].picture.large

    //   // const objet = {
    //   //   email: this.profileForm.value.utilisateur,
    //   //   avatar: user.results[2].picture.large
    //   // }
    // })
  }

}
