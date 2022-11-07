import { DataService } from 'src/app/services/data.service';
import { UserService } from './../../services/user.service';
import { Observable, map, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { job } from 'src/helpers/job';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.scss']
})
export class FinderComponent implements OnInit {
  showFiller = false;

  // recupJobs!: any
  myControl = new FormControl();
  options: string[] = job
  recupJobs!: any;
  constructor(private dataService: DataService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.recupJobs = this.dataService.jobs
    // console.log(this.recupJobs);
    this.recupJobs = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
      );
    }
    onClick(){
     this.userService.clearToken()}
  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  
}
