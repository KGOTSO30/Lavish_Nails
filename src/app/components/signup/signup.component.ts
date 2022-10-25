import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

import { switchMap } from 'rxjs/operators';

import { UsersService } from '../../services/user.service';

import { AuthService } from "../../services/auth.service";
import { user } from '@angular/fire/auth';


export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword){
      return {
        passwordsDontMatch: true
      }
    }
    return null;

  };
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
//signUpForm = new FormGroup({

  signUpForm = this.fb.group({
   // uid: new FormControl(''),
  //  email: new FormControl('',[Validators.email, Validators.required]),
  email: ['', [Validators.required, Validators.email]],
  //  firstName: new FormControl('', Validators.required),
  displayName: ['', Validators.required],
  //  lastName: new FormControl('', Validators.required),
  lastName: ['', Validators.required],
  //  password: new FormControl ('', Validators.required),
  password: ['', Validators.required],
  //  phoneNumber: new FormControl ('', Validators.required),
  phoneNumber: ['', Validators.required],
  //  confirmPassword: new FormControl('', Validators.required),
  confirmPassword: ['', Validators.required],
  //  completedAppointments: new FormControl(''),
  //  totalSpend: new FormControl(''),
  },
  { validators: passwordsMatchValidator() }
 

  );

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private toast: HotToastService,
    private fb: NonNullableFormBuilder
  ) { }

  ngOnInit(): void {
  }

  get displayName() {
    return this.signUpForm.get('displayName');

  }
  get lastName() {
    return this.signUpForm.get('lastName');

  }

  get email() {
    return this.signUpForm.get('email');
    
  }

  get password() {
    return this.signUpForm.get('password');
    
  }
  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
    
  }

  get phoneNumber() {
    return this.signUpForm.get('phoneNumber');
    
  }

  submit(){
    const {displayName, lastName, email, password, phoneNumber, /* completedAppointments, totalSpend */} = this.signUpForm.value;
  
   // if (!this.signUpForm.valid ) {return;}


   
     this.authService
    .signUp( email!, password!)
    .pipe(
      switchMap(({ user: {uid} }) => 
        this.usersService.addUser({
          uid, email, displayName, lastName, phoneNumber })
      ),
      this.toast.observe({
        success: 'Congrats! You are all signed up',
        loading: 'Signing up...',
        error: ({ message }) => `${message}`,
      })
    )
    .subscribe(() => {
      this.router.navigate(['/home']);
    });
    
   // , lastName, phoneNumber,completedAppointments, totalSpend
        
    
    
  }

  
}
