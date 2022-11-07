import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-top-bar',
  templateUrl: './chat-top-bar.component.html',
  styleUrls: ['./chat-top-bar.component.scss']
})
export class ChatTopBarComponent implements OnInit {

@Input() donnees!: any


  constructor() { }

  ngOnInit(): void {
  }
}