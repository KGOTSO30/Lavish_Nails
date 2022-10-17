import { Component } from '@angular/core';
import { RouterModule, Router} from '@angular/router'

import { AuthService } from "src/app/services/auth.service";
import { Observable } from 'rxjs';
import { Client} from './shared/client'
import { UsersService } from 'src/app/services/user.service';

// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
 // currentUser!: Observable<firebase.users | null>;

 //user$ = this.usersService.currentUserProfile$;

  constructor(private usersService: UsersService, public authService: AuthService, private router: Router){

  }


  logout() {

    this.authService.logout();
    this.router.navigate(['']);


  }



}
