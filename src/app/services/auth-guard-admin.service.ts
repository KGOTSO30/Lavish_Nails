import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take, map, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdminService {
  constructor(private auth: AuthService, private router: Router) {}
  
  canActivate(next: any, state: any): Observable<boolean> {
    return this.auth.user$.pipe(
      take(1),
      map(user => !!user), // <-- map to boolean
      tap(loggedIn => {
        if (!loggedIn) {
          console.log('access denied');
          this.router.navigate(['/']);
        }
      })
    );
  }


}
