import { Component, OnInit, ViewEncapsulation,Inject } from '@angular/core';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']

})
export class ErrorComponent implements OnInit {

  message:string;
  token:any;
  constructor(public dialog:MatDialog) { }

  openDialog():void{
    this.token = localStorage.getItem('Authentication');
    console.log(this.token);
    if(this.token == 'false'){
      let dialogRef = this.dialog.open(DialogData,{
        height:'400px',
        width:'500px'
      })
    }
  }

  ngOnInit() {
    this.openDialog()
  }

}

@Component({
  selector: 'dialog-data',
  template:`
  <div class="dialog-container">
  <h1 mat-dialog-title>Favorite Animal</h1>
  <div mat-dialog-content>
    My favorite animal is:
      A Beast
  </div>
  </div>

  `
})
export class DialogData {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
