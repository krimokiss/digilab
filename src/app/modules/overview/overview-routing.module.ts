import { UserResolverResolver } from './../../resolvers/user-resolver.resolver';
import { ProfilComponent } from './../../components/profil/profil.component';
import { ChatComponent } from './../../components/chat/chat.component';
import { WeatherComponent } from './../../components/weather/weather.component';
import { DirectoryComponent } from './../../components/directory/directory.component';
import { AuthGuard } from './../../helpers/auth.guard';
import { OverviewComponent } from './../../components/overview/overview.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 
  {path: '', component: OverviewComponent,
  children:[
    {path: 'directory', component: DirectoryComponent, canActivate:[AuthGuard]},
    {path: 'weather', component: WeatherComponent, canActivate:[AuthGuard]},
    {path: 'chat', component: ChatComponent, canActivate:[AuthGuard], resolve:{profile:UserResolverResolver}}, 
    {path: 'profil', component: ProfilComponent, canActivate:[AuthGuard]}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverviewRoutingModule { }
