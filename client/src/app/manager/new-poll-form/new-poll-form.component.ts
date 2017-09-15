import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeDirective } from 'angular2-materialize';
import { AppService } from "app/app.service";
import { MaterializeAction } from 'angular2-materialize';

declare var Materialize: any;

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

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  createPoll() {
    if (this.selectedMonth && this.selectedYear && this.pollName) {
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
    Materialize.toast("הסקר פורסם בהצלחה!", 4000);
  }
}
