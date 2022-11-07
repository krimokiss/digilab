import { Router } from '@angular/router';
import { User } from './../models/user';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _apiUrl = `${environment.API_URL}api/users`;
  url = 'https://reqres.in/api/users?page-2';
  urlUsers = 'https://reqres.in/api/users?page=2';
  user = new Subject<any>()
  database = this._apiUrl;
  dataUser = this._apiUrl;

  constructor(private _http: HttpClient,
    private router: Router) { }

  postData(directoryForm: any): Observable<any> {
    return this._http.post(this.url, { data: directoryForm })
  }

  getUsers(): Observable<any> {
    return this._http.get(this.urlUsers)
  }
  getUsersList():Observable<any>{
    return this._http.get(`${this._apiUrl}/list`, {observe: 'response'})
  }

  setCurrentUser(person: any): void {
    this.user.next(person)
  }

  getCurrentUser(): Observable<any> {
    return this.user.asObservable()
  }

  // On envoi au backEnd
  postUsers(user: User) {
    return this._http.post(`${this.database}/register`, user)
  }

  postUsersLogin(user: User): Observable<User> {
    return this._http.post<User>(`${this.database}/login`, user)
  }

  getDataUsers(): Observable<any> {
    return this._http.get(`${this.database}/register`)
  }

  // saveToken(token: string): void {
  //   localStorage.setItem('token', token)
  //   this.router.navigate(['overview'])
  // }
  // isLogged(): boolean {
  //   const token = localStorage.getItem('token')
  //   return !!token
  // }
  clearToken(): void {
    localStorage.removeItem('token')
    this.router.navigate((['/']))
  }


  getProfil(): Observable<any> {
    // let headerToken = new HttpHeaders().append('Authorization', `Bearer ${this.getToken()}`)
    return this._http.get(this.dataUser + "/profile")
  }

  static getToken() {
    return localStorage.getItem('token')
  }

  getJojo(): Observable<any> {
    const newHeaders = new HttpHeaders()
      .append('Authorization', `Bearer ${UserService.getToken()}`)
    return this._http.get(this.dataUser, { headers: newHeaders })
  }

}

