import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LogoutComponent>
  ) { }

  clickedNo() {
    this.dialogRef.close(false)
  }

  clickedYes() {
    this.dialogRef.close(true)
  }


  ngOnInit() {
  }

}
