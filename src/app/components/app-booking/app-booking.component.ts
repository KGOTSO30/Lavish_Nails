
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import {Appointment} from 'src/app/models/appointment.model'
import {CrudService} from 'src/app/shared/crud.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Hero,Nail } from '../menu/hero';
import { HEROES,PolyGel, Rubberbase } from '../menu/models';
//import { DatePipe } from '@angular/common';
import {
  Auth,
  signInWithEmailAndPassword,
  authState,
  createUserWithEmailAndPassword,
  updateProfile,
  UserInfo,
  UserCredential,} from '@angular/fire/auth'


@Component({
  selector: 'app-app-booking',
  templateUrl: './app-booking.component.html',
  styleUrls: ['./app-booking.component.css']
})
export class AppBookingComponent implements OnInit {



  // example for today's labels and invalids
myLabels = [{
  start: '2022-10-14',
  textColor: '#e1528f',
  title: '4 SPOTS'
}];
myInvalid = [{
  start: '2022-10-14T08:00',
  end: '2022-10-14T13:00'
}, {
  start: '2022-10-14T15:00',
  end: '2022-10-14T17:00'
}, {
  start: '2022-10-14T19:00',
  end: '2022-10-14T20:00'
}];


polygel = PolyGel;
rubberbase = Rubberbase;


heroes = HEROES;
selectedHero?: Hero;

  appointment: Appointment = new Appointment();
  submitted = false;
  selected!: Date | null;

  members!: any[];
  dataSource!: MatTableDataSource<any>;
  myDocData: any;
  data: any;
  currentDate: any;
  currentDate7: any;
  toggleField!: string;
  state: string = '';
  savedChanges = false;
  error: boolean = false;
  errorMessage: String = "";
  dataLoading: boolean = false;
  private querySubscription: any;

  profileUrl!: Observable<string | null>;
  takeHostSelfie = false;
  showHostSelfie = false;
  myDocId: any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  displayedColumns = ['category', 'Appointment Date', 'name', 'price', '_id'];
  

  public min: Date = new Date(2000, 2, 10, 2, 30);
  public max: Date = new Date(2002, 2, 10, 22, 15);
  public value: Date = new Date(2000, 2, 10, 10, 0);
  

  constructor(private appointmentService: CrudService,
     private auth: AuthService,
     private auth1: Auth,
     //public datepipe: DatePipe
     ) {
    this.appointment.appointmentDate = this.selected;
   }

  ngOnInit(): void {
    this.invokeStripe();
    this.toggleField = "searchMode";
    
    this.dataSource = new MatTableDataSource(this.members);
    this.currentDate = new Date();
    this.currentDate.setDate(this.currentDate.getDate() + 1);
    console.log(localStorage.getItem('center'));
  }

 
   toggle(filter?: any) {
        this.dataLoading = false;
        if (!filter) { filter = "searchMode" }
        else { filter = filter; }
        this.toggleField = filter;
    }
    onSelect(hero: Hero): void {
      this.selectedHero = hero;
    }


    setAppData(formData: any) {
      // formData.tags = formData.tags.split(',');    
        this.auth.setNewAppDoc('Store/Lavish/user-carts', formData, this.selectedHero?.name,this.selectedHero?.id).then((res: any) => {
            this.savedChanges = true;
            this.dataLoading = false;
        }).catch((error: { message: String; }) => {
            this.error = true;
            this.errorMessage = error.message;
            this.dataLoading = false;
        });
    }
  
    updateAppData(formData: any) {
      // formData.tags = formData.tags.split(',');
       if (confirm("Are you sure want to update this record ?")) {
           this.dataLoading = true;
           this.auth.updateAppDoc('Store/Lavish/user-carts', formData._id, formData,this.selectedHero?.name, this.selectedHero?.id).then((res) => {
               this.error = false;
               this.errorMessage = "";
               this.dataLoading = false;
               this.savedChanges = true;
           }).catch(error => {
               this.error = true;
               this.errorMessage = error.message;
               this.dataLoading = false;
           });
       }
     }
  setData(formData: any) {
  // formData.tags = formData.tags.split(',');
    this.dataLoading = true;
    this.auth.setNewDoc('Store/Lavish/product', formData).then((res: any) => {
        this.savedChanges = true;
        this.dataLoading = false;
    }).catch((error: { message: String; }) => {
        this.error = true;
        this.errorMessage = error.message;
        this.dataLoading = false;
    });
}

getData() {
  this.dataLoading = true;
  this.querySubscription = this.auth.getProducts()
      .subscribe(members => {
          this.members = members;
          this.dataSource = new MatTableDataSource(members);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      });
     // this.dataSource.subscribe(res => console.log(res));
}
getDataByDoc(){
  this.querySubscription = this.auth.getDocs()
  .subscribe(members => {
      this.members = members;
      this.dataSource = new MatTableDataSource(members);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  });

}
getDataByAppDoc(){
  this.querySubscription = this.auth.getAppDocs()
  .subscribe(members => {
      this.members = members;
      this.dataSource = new MatTableDataSource(members);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  });

}



getAppDoc(docId: string) {
  this.dataLoading = true;
  this.querySubscription = this.auth.getAppProduct( docId)
      .subscribe(res => {
          this.myDocData = res;
          this.toggle('editMode');
          this.dataLoading = false;
      },
          (error) => {
              this.error = true;
              this.errorMessage = error.message;
              this.dataLoading = false;
          },
          () => { this.error = false; this.dataLoading = false; });
}

deleteAppDoc(docId: string) {
  if (confirm("Are you sure want to delete this record ?")) {
      this.dataLoading = true;
      this.auth.deleteAppProduct( docId).then((res) => {
          this.error = false;
          this.errorMessage = "";
          this.dataLoading = false;
          this.toggle('resMode');
      }).catch(error => {
          this.error = true;
          this.errorMessage = error.message;
          this.dataLoading = false;
      });
  }
}

getDoc(docId: string) {
  this.dataLoading = true;
  this.querySubscription = this.auth.getProduct( docId)
      .subscribe(res => {
          this.myDocData = res;
          this.toggle('editMode');
          this.dataLoading = false;
      },
          (error) => {
              this.error = true;
              this.errorMessage = error.message;
              this.dataLoading = false;
          },
          () => { this.error = false; this.dataLoading = false; });
}

deleteDoc(docId: string) {
  if (confirm("Are you sure want to delete this record ?")) {
      this.dataLoading = true;
      this.auth.deleteProduct( docId).then((res) => {
          this.error = false;
          this.errorMessage = "";
          this.dataLoading = false;
          this.toggle('searchMode');
      }).catch(error => {
          this.error = true;
          this.errorMessage = error.message;
          this.dataLoading = false;
      });
  }
}



updateData(formData: any) {
 // formData.tags = formData.tags.split(',');
  if (confirm("Are you sure want to update this record ?")) {
      this.dataLoading = true;
      this.auth.updateProduct('Store/Lavish/product', formData).then((res) => {
          this.error = false;
          this.errorMessage = "";
          this.dataLoading = false;
          this.savedChanges = true;
      }).catch(error => {
          this.error = true;
          this.errorMessage = error.message;
          this.dataLoading = false;
      });
  }
}


 //mat table paginator and filter functions
 ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
// applyFilter(filterValue: string) {
//     filterValue = filterValue.trim(); // Remove whitespace
//     filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
//     this.dataSource.filter = filterValue;
// }



paymentHandler: any = null;
  
makePayment(amount: any, service: any) {
  const paymentHandler = (<any>window).StripeCheckout.configure({
    key: 'pk_test_51LvVKoBFn7mfkH25MPo8yiqOUcx1wSKIx15Xb16TkqDRmaMzoeBBRCUSPa1qjF0mzySFl6sdznRWBh52TQIBaLp800WTJBrdV8',
    locale: 'auto',
    token: function (stripeToken: any) {
      console.log(stripeToken);
      alert('Stripe token generated!---Maybe you might wanna say Payment Successful---Again why devs need designers');
    },
  });
  paymentHandler.open({
    name: 'Lavished',
    description: service + 'why devs need designers',
    amount: amount * 100,
    email: this.auth1.currentUser?.email,
    currency: 'ZAR'
  });
}
invokeStripe() {
  if (!window.document.getElementById('stripe-script')) {
    const script = window.document.createElement('script');
    script.id = 'stripe-script';
    script.type = 'text/javascript';
    script.src = 'https://checkout.stripe.com/checkout.js';
    script.onload = () => {
      this.paymentHandler = (<any>window).StripeCheckout.configure({
        key: 'pk_test_51LvVKoBFn7mfkH25MPo8yiqOUcx1wSKIx15Xb16TkqDRmaMzoeBBRCUSPa1qjF0mzySFl6sdznRWBh52TQIBaLp800WTJBrdV8',
        locale: 'auto',
        token: function (stripeToken: any) {
          console.log(stripeToken);
          alert('Payment has been successfull!');
        },
      });
    };
    window.document.body.appendChild(script);
  }
}
ngOnDestroy() {

  if (this.querySubscription) {
      this.querySubscription.unsubscribe();
  }
}
}


  
