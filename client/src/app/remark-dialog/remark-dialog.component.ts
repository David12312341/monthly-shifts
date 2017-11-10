import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-remark-dialog',
  templateUrl: './remark-dialog.component.html',
  styleUrls: ['./remark-dialog.component.css']
})
export class RemarkDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RemarkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
