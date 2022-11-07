import { MatBadgeModule } from '@angular/material/badge';
import { environment } from 'src/environments/environment';
import { TokenInterceptorPovider } from './helpers/token.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule} from '@angular/material/input';
import { MatListModule} from '@angular/material/list';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { SocketIoConfig, SocketIoModule} from'ngx-socket-io';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ChatComponent } from './components/chat/chat.component';
import { CardComponent } from './components/card/card.component';
import { DirectoryComponent } from './components/directory/directory.component';
import { ProfilComponent } from './components/profil/profil.component';
import { UserComponent } from './components/user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectoryModalComponent } from './modals/directory-modal/directory-modal.component';
import { WeatherComponent } from './components/weather/weather.component';
import { WeatherModalComponent } from './modals/weather-modal/weather-modal.component';
import { SidebarLeftComponent } from './sidebar-left/sidebar-left.component';
import { SidebarRightComponent } from './sidebar-right/sidebar-right.component';
import { ChatUserListComponent } from './components/chat-user-list/chat-user-list.component';
import { ChatModalComponent } from './modals/chat-modal/chat-modal.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { ChatTopBarComponent } from './components/chat-top-bar/chat-top-bar.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FinderComponent } from './components/finder/finder.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import { PickerModule } from "@ctrl/ngx-emoji-mart";

const config: SocketIoConfig = {url:`${environment.API_URL}`, options:{}};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    OverviewComponent,
    ChatComponent,
    CardComponent,
    DirectoryComponent,
    ProfilComponent,
    UserComponent,
    DirectoryModalComponent,
    WeatherComponent,
    WeatherModalComponent,
    SidebarLeftComponent,
    SidebarRightComponent,
    ChatUserListComponent,
    ChatModalComponent,
    ChatRoomComponent,
    ChatTopBarComponent,
    FinderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    MatChipsModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatCardModule,
    MatTabsModule,
    MatRadioModule,
    PickerModule,
    SocketIoModule,
    SocketIoModule.forRoot(config),
    MatSlideToggleModule,
    MatBadgeModule
    
  ],
  providers: [TokenInterceptorPovider],
  bootstrap: [AppComponent]
})
export class AppModule { }
