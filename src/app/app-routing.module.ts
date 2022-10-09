import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { AppointmentDetailsComponent } from './components/appointment-details/appointment-details.component'; 

import {
  HighchartsChartModule
} from "highcharts-angular";

import { SalesComponent } from './components/sales/sales.component';
import { ListComponent } from './components/book-now/list/list.component';
import { ProfileComponent } from './components/profile/profile.component'; 
import { ReportTestComponent } from './components/report-test/report-test.component'; 
import { SalonComponent } from './components/salon/salon.component'; 
import { AddAppointmentComponent } from './components/add-appointment/add-appointment.component'; 
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { BookNowComponent } from './components/book-now/book-now.component';
import { LandingComponent } from './components/landing/landing.component';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { AuthGuard } from './services/auth.guard';

//import { ProfileComponent } from './components/profile/profile.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);


const routes: Routes = [
  {
    path: '',
    
    pathMatch: 'full',
    component: LoginComponent
    
  },
  {
    path: 'landing',
    component: LandingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    //...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'signup',
    component: SignupComponent,
    //...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'home',
    component: HomeComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'add-appointment',
    component: AddAppointmentComponent,
   // ...canActivate(redirectUnauthorizedToLogin),
   
  },
  {
    path: 'book-now',
    component: BookNowComponent,
  },
  {
    path: 'list',
    component: ListComponent,
  },

  {
    path: 'salon',
    component: SalonComponent,
  },

  {
    path: 'report-test',
    component: ReportTestComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  { path: 'pokemon', loadChildren: () => import('./core/features/pokemon/pokemon.module').then(m => m.PokemonModule) },

  
  {
    path: 'sales',
    component: SalesComponent,
  }, 

];

@NgModule({
  declarations:[],
  imports: [
    CommonModule,
  
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
