import { Component } from '@angular/core';
import { RouterModule, Router} from '@angular/router'
import { AuthenticationService } from './services/authentication.service';
import { AuthService } from "src/app/services/auth.service";
import { Observable } from 'rxjs';
import { Client} from './shared/client'

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
 // currentUser!: Observable<firebase.users | null>;
  
  constructor(public authService: AuthService, private router: Router){

  }

  
  logout() {
    
    /*
    this.authService.SignOut().pipe().subscribe(() => {
      this.router.navigate(['']);
    });
    */
  }
  

  Book() {
    
      this.router.navigate(['/book-now']);
    }
}
