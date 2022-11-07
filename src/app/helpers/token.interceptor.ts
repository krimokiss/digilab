import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../services/user.service';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private userService: UserService,
              private snackBar : MatSnackBar) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const userToken = UserService.getToken();
    let modifiedReq = req
    // console.log(req.url);
    
    if (req.url.includes(environment.API_URL+'api')) {
      
      modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${userToken}`)
      })
    }
    return next.handle(modifiedReq).pipe(
      catchError(error => {
let message = ''
        switch (error.status){
        case 400: message = 'Bad Request'
        break
        case 401: message = 'Unauthorized'
        break
        case 403: message = 'Forbidden'
        break

        }
        this.snackBar.open(message, 'ok', {verticalPosition:'top'})
        return next.handle(modifiedReq)
      })
    )
  }
}


export const TokenInterceptorPovider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true
}
