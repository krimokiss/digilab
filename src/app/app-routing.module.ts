import { AuthGuard } from './helpers/auth.guard';
import { FinderComponent } from './components/finder/finder.component';
import { ProfilComponent } from './components/profil/profil.component';
import { ChatComponent } from './components/chat/chat.component';
import { WeatherComponent } from './components/weather/weather.component';
import { DirectoryComponent } from './components/directory/directory.component';
import { OverviewComponent } from './components/overview/overview.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'finder', component: FinderComponent, canActivate:[AuthGuard]},
  {
    path: 'overview', 
    component: OverviewComponent, canActivate:[AuthGuard],
    children:[
    {path: 'directory', component: DirectoryComponent, canActivate:[AuthGuard]},
     {path: 'weather', component: WeatherComponent, canActivate:[AuthGuard]},
      {path: 'chat', component: ChatComponent, canActivate:[AuthGuard]}, 
      {path: 'profil', component: ProfilComponent, canActivate:[AuthGuard]}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
