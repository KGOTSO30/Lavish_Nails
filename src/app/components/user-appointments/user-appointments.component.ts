import { Component, OnInit, ViewChild,  Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import {Appointment} from 'src/app/models/appointment.model'
import {CrudService} from 'src/app/shared/crud.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
//import {MatDialog, MatDialogConfig} from "@angular/material";


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-user-appointments',
  templateUrl: './user-appointments.component.html',
  styleUrls: ['./user-appointments.component.css']
})


export  class UserAppointmentsComponent implements OnInit {
 
  
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

  myDocId: any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  displayedColumns = ['category', 'Appointment Date', 'name', 'price', '_id'];

  constructor(private auth: AuthService, private dialog: MatDialog) { }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners'
  };
    this.dialog.open(CourseDialogComponent, dialogConfig);
    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);
   
    
   
    dialogConfig.position = {
      'top': '0',
      left: '0'
  };
  
}


  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.members);
  }


  getDataByAppDoc(){
    this.querySubscription = this.auth.getUserAppointments()
    .subscribe(members => {
        this.members = members;
        this.dataSource = new MatTableDataSource(members);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
  
  }

  deleteAppDoc(docId: string) {
    if (confirm("Are you sure want to delete this record ?")) {
        this.dataLoading = true;
        this.auth.deleteAppProduct( docId).then((res) => {
            this.error = false;
            this.errorMessage = "";
            this.dataLoading = false;
           // this.toggle('resMode');
        }).catch(error => {
            this.error = true;
            this.errorMessage = error.message;
            this.dataLoading = false;
        });
    }
    this.openDialog();
  }

 
}
