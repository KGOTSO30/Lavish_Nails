import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

user$ = this.authService.currentUser$;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  book(){
    this.router.navigateByUrl('/landing');
  }

}
