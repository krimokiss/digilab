import { UserService } from './../services/user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
    private snackBar : MatSnackBar,
              private userService : UserService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = UserService.getToken();
    if (token) {
      return true;
    } else {

      this.snackBar.open('Vous devez être authentifier pour accéder à cette page!', 'ok', {verticalPosition:'top'})
      return this.router.navigate(['login']);
      
    }
  }
  
}
