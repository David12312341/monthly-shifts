import { Component, OnInit, Input, Output } from '@angular/core';
import { AppService } from "app/app.service";
import { MatDialog } from "@angular/material/dialog";
import { RemarkDialogComponent } from "app/remark-dialog/remark-dialog.component";

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {
  shouldSetSelected: boolean;
  shouldSetIndeterminate: any;

  selectedShift: any;
  selectedRemark: string;
  @Input() managerMode: boolean;
  @Input() poll: any;

  constructor(private appService: AppService, public dialog: MatDialog) {
  }

  ngOnInit() { }

  onShiftChange(shift: any): void {
    shift.isIndeterminate = this.shouldSetIndeterminate;
    shift.isSelected = this.shouldSetSelected;
    console.log(`shift is selected: ${shift.isSelected}`);
    console.log(`shift is indeterminate: ${shift.isIndeterminate}`);
  }

  onShiftClick(shift: any): void {
    if (shift.isIndeterminate) {
      this.shouldSetIndeterminate = false;
      this.shouldSetSelected = false;
    } else if (shift.isSelected) {
      this.shouldSetIndeterminate = true;
      this.shouldSetSelected = null;
    } else {
      this.shouldSetIndeterminate = false;
      this.shouldSetSelected = true;
    }
  }

  openRemarkDialog(shift: any): void {
    this.selectedShift = shift;
    this.selectedRemark = shift.remark;
    this.dialog.open(RemarkDialogComponent, { width: "250px", direction: "rtl" })
      .afterClosed().subscribe(result => shift.remark = result);
  }

  checkTextInput(day: { shifts: any[] }, shift) {
    if (shift.time == "") day.shifts.splice(day.shifts.indexOf(shift), 1);
    if (day.shifts[day.shifts.length - 1].time && day.shifts[day.shifts.length - 1].time != "") day.shifts.push({});
  }
}
