import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { BookNowComponent } from './components/book-now/book-now.component';
import { LandingComponent } from './components/landing/landing.component';
/*import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

*///import { ProfileComponent } from './components/profile/profile.component';

//const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
//const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingComponent
  },
  {
    path: 'login',
    component: LoginComponent
   // ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'sign-up',
    component: SignupComponent
   // ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'home',
    component: HomeComponent
   // ...canActivate(redirectUnauthorizedToLogin),
  }

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
