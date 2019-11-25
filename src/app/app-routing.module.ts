import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginPageComponent} from './login-page/login-page.component';
import {MainPageComponent} from './main-page/main-page.component';
import {AuthGuard} from './auth.guard';


const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'login', component: LoginPageComponent},
  {path: 'main', component: MainPageComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
