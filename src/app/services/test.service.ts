import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {

 
  httpMeteo ='https://api.open-meteo.com/v1/forecast'
  randomUser ='https://randomuser.me/api/?results=50&nat=fr'
  httpGeoLoc = 'https://api-adresse.data.gouv.fr/reverse/'
  httpQuotes = 'https://breaking-bad-quotes.herokuapp.com/v1/quotes/1'
  user = new Subject<any>()


  constructor(private http: HttpClient) { }


meteo(latitude:number, longitude:number):Observable<any>{
  const parametres = new HttpParams()
  .append('latitude', latitude)
  .append('longitude', longitude)
  .append('hourly', 'temperature_2m')
  .append('timezone', 'Europe/London')

  return this.http.get(this.httpMeteo, { params:parametres})
}

GetUsers():Observable<any>{
  return this.http.get(this.randomUser)
}
getQuotes():Observable<any>{
  return this.http.get(this.httpQuotes)
}

getLocation(latitude:number, longitude:number):Observable<any>{
  const parametres = new HttpParams()
  .append('lat', latitude)
  .append('lon', longitude)
  return this.http.get(this.httpGeoLoc, {params:parametres})
}

setCurrentUser(person: any): void {
  this.user.next(person)
 }
 getCurrentUser(): Observable<any> {
  return this.user.asObservable()
}

}
