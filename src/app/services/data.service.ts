import { job } from './../../helpers/job';
import { Observable, Subject, of, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  httpJoke = 'https://official-joke-api.appspot.com/random_ten'
  profile = new BehaviorSubject<any>({})
  dataUser!: any
  workers!: any
  jobs = job


  constructor(private http: HttpClient) { }

  joke(): Observable<any> {
    return this.http.get(this.httpJoke)
  }


  getProfile(): Observable<any> {
    this.dataUser = localStorage.getItem('user')
    const str = JSON.parse(this.dataUser);
    const arobase = str.email.split('@');
    const words = arobase[0].split('.');

    if (this.dataUser) {
      this.profile.next({ prenom: words[0], nom: words[1], image: str.avatar })
      return this.profile.asObservable()

    } else {
      return of();
    }
  }

  getWorkers(): void {
    this.workers = this.jobs

  }
}
