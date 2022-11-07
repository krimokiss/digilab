import { TestService } from './../services/test.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-right',
  templateUrl: './sidebar-right.component.html',
  styleUrls: ['./sidebar-right.component.scss']
})
export class SidebarRightComponent implements OnInit {
  citation !: any

  constructor(private testService: TestService) { }

  ngOnInit(): void {
    this.testService.getQuotes().subscribe((value: any)=>{
      this.citation = value
      // console.log(profilUser);
    })
  }

}
