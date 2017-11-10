import { Component, OnInit, EventEmitter } from '@angular/core';
import { AppService } from "app/app.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'new-poll-form',
  templateUrl: './new-poll-form.component.html',
  styleUrls: ['./new-poll-form.component.css']
})
export class NewPollFormComponent implements OnInit {

  pollName: number;
  currentYear: number = new Date(Date.now()).getFullYear();
  currentMonth: number = new Date(Date.now()).getMonth();
  selectedMonth: number;
  selectedYear: number;
  poll: any;

  constructor(private appService: AppService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  createPoll() {
    if (this.selectedMonth != undefined && this.selectedYear && this.pollName) {
      this.appService.getMonth(this.selectedYear, this.selectedMonth)
        .subscribe(poll => {
          poll.forEach(week => {
            week.forEach(day => {
              if (!day.shifts) return;
              day.shifts.push({});
            });
          });
          this.poll = poll;
        });
    }
  }

  publishPoll(): void {
    let poll = this.poll;
    poll.forEach(week => {
      week.forEach(day => {
        if (day.shifts) {
          let badShifts: any[] = day.shifts.filter(shift => !shift.time);
          badShifts.forEach(shift => {
            day.shifts.splice(day.shifts.indexOf(shift), 1);
          })
        }
      });
    });
    this.appService.publishPoll({
      name: this.pollName,
      month: this.selectedMonth,
      year: this.selectedYear,
      shifts: poll
    });
    this.snackBar.open("הסקר פורסם בהצלחה!", null, { duration: 4000, direction: "rtl" });
  }
}
