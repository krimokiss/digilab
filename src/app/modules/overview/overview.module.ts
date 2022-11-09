import { SidebarLeftComponent } from './../../components/sidebar-left/sidebar-left.component';
import { SidebarRightComponent } from './../../components/sidebar-right/sidebar-right.component';
import { ChatUserListComponent } from './../../components/chat-user-list/chat-user-list.component';
import { ChatRoomComponent } from './../../components/chat-room/chat-room.component';
import { ChatTopBarComponent } from './../../components/chat-top-bar/chat-top-bar.component';
import { ProfilComponent } from './../../components/profil/profil.component';
import { WeatherComponent } from './../../components/weather/weather.component';
import { DirectoryComponent } from './../../components/directory/directory.component';
import { ChatComponent } from './../../components/chat/chat.component';
import { SharedModule } from './../shared/shared.module';
import { OverviewComponent } from './../../components/overview/overview.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewRoutingModule } from './overview-routing.module';


@NgModule({
  declarations: [
    OverviewComponent,
    ChatComponent,
    DirectoryComponent,
    WeatherComponent,
    ProfilComponent,
    SidebarRightComponent,
   SidebarLeftComponent,
    ChatTopBarComponent,
    ChatRoomComponent,
    ChatUserListComponent,

  ],
  imports: [
    CommonModule,
    OverviewRoutingModule,
    SharedModule
  ],
  exports: [
    CommonModule,
    OverviewRoutingModule,
    SharedModule
  ]
})
export class OverviewModule { }
