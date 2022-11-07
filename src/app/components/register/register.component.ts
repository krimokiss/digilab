import { UserService } from './../../services/user.service';
import { User } from './../../models/user';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  inscription = new FormControl('');
  emailRegex!: RegExp;
  passwordRegex!: RegExp;
  postaleRegex!: RegExp;
  villeRegex!: RegExp;
  adresseRegex!: RegExp;
  profileForm!: FormGroup;
  user = new User()


  constructor(private formbuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService) { }

  ngOnInit(): void {
    this.emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/
    this.passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,20})/
    this.postaleRegex = /^[0-9]{5}/
    this.villeRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/
    this.adresseRegex = /^[a-zA-Z0-9\s,'-]|[\\u00C0\\u00C1\\u00C2\\u00C3\\u00C4\\u00C5\\u00C6\\u00C7\\u00C8\\u00C9\\u00CA\\u00CB\\u00CC\\u00CD\\u00CE\\u00CF\\u00D0\\u00D1\\u00D2\\u00D3\\u00D4\\u00D5\\u00D6\\u00D8\\u00D9\\u00DA\\u00DB\\u00DC\\u00DD\\u00DF\\u00E0\\u00E1\\u00E2\\u00E3\\u00E4\\u00E5\\u00E6\\u00E7\\u00E8\\u00E9\\u00EA\\u00EB\\u00EC\\u00ED\\u00EE\\u00EF\\u00F0\\u00F1\\u00F2\\u00F3\\u00F4\\u00F5\\u00F6\\u00F9\\u00FA\\u00FB\\u00FC\\u00FD\\u00FF\\u0153]*$/


    this.user.avatar = 'https://thumbs.gfycat.com/IncompleteAggravatingIcelandichorse-size_restricted.gif'
    this.profileForm = this.formbuilder.group({
      firstName: [this.user.firstName, [Validators.required, Validators.minLength(2)]],
      lastName: [this.user.lastName, [Validators.required, Validators.minLength(2)]],
      username: [this.user.username, [Validators.required, Validators.minLength(2)]],
      phoneNumber: [this.user.phoneNumber, [Validators.required,Validators.minLength(2)]],
      date: ['', Validators.required],
      email: [this.user.email, [Validators.required, Validators.pattern(this.emailRegex)]],
      street: [this.user.street, [Validators.required, Validators.pattern(this.adresseRegex)]],
      zipCode: [this.user.zipCode, [,Validators.minLength(5),Validators.maxLength(5),Validators.pattern('[0-9]{5}')]],
      city: [this.user.city, [Validators.required, Validators.pattern(this.villeRegex), Validators.minLength(3)]],
      country: [this.user.country, [Validators.required, Validators.pattern(this.villeRegex), Validators.minLength(3)]],
      password: [this.user.password, [Validators.required, Validators.pattern(this.passwordRegex)]],
      ConfirmPassword: ['', [Validators.required, Validators.pattern(this.passwordRegex)]],

    });
  }
  onSubmit() {
    const form = this.profileForm.value
    const Profile = this.profileForm.value
    const MotDePasse = Profile.password
    const ConfirmMotDePasse = Profile.ConfirmPassword
    if (MotDePasse !== ConfirmMotDePasse) {
      this.snackBar.open('Votre mot de passe ne correspond pas', 'ok', { verticalPosition: 'top' })
      return;
    }
    // this.user.firstName = form.nom
    // ...etc
    this.user = Object.assign(this.user, form)
        
    this.userService.postUsers(this.user).subscribe((result:any)=>{
      console.log(result);
      localStorage.setItem('token', result.token)
          // TODO: Use EventEmitter with form value
          this.router.navigate(['overview'])
    }
    )
    // console.warn(Profile);
  }

}
