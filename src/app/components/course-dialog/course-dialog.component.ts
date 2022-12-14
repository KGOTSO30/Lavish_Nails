import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {

 

  form!: FormGroup;
  description:string;

  constructor(
    private dialog: MatDialog,
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<CourseDialogComponent>,
      @Inject(MAT_DIALOG_DATA) data:any) {

      this.description = data.description;
  }

  ngOnInit() {
      this.form = this.fb.group({
          description: [this.description],
          
      });
  }

  save() {
      this.dialogRef.close(this.form.value);
  }

  close() {
    
   /*    this.dialogRef.close(); */
    this.dialog.closeAll();
      
  }
}
