import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { AppointmentDetailsComponent } from './components/appointment-details/appointment-details.component';

import { HighchartsChartModule } from 'highcharts-angular';

import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminTabComponent } from './components/admin/admin-tab/admin-tab.component';

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
import { MenuComponent } from './components/menu/menu/menu.component';
import { AppBookingPaymentComponent } from './components/app-booking-payment/app-booking-payment.component';
import { AdminCartsComponent } from './components/admin/admin-carts/admin-carts.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { UserAppointmentsComponent } from './components/user-appointments/user-appointments.component';

import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { AuthGuard } from './services/auth.guard';
import { AuthGuardAdminService } from './services/auth-guard-admin.service';

//import { ProfileComponent } from './components/profile/profile.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',

    pathMatch: 'full',
    component: HomeComponent,
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
    //...canActivate(redirectUnauthorizedToLogin),
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
    path: 'menu',
    component: MenuComponent,
  },

  {
    path: 'report-test',
    component: ReportTestComponent,
  },

  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'pokemon',
    loadChildren: () =>
      import('./core/features/pokemon/pokemon.module').then(
        (m) => m.PokemonModule
      ),
  },

  {
    path: 'sales',
    component: SalesComponent,
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    //canActivate: [AuthGuardAdminService]
  },
  {
    path: 'admin-login',
    component: AdminLoginComponent,
  },
  {
    path: 'admin',
    component: AdminTabComponent,
   // canActivate: [AuthGuardAdminService]
  },
  {
    path: 'booking-payment',
    component: AppBookingPaymentComponent,
  },

  {
    path: 'admin-carts',
    component: AdminCartsComponent
  },

  {
    path: 'admin-users',
    component:  AdminUsersComponent
  },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'user-appointments', component: UserAppointmentsComponent },
 
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
