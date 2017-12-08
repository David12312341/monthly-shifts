import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from "app/app.service";
import { User } from "app/models/user";
import { Observable } from "rxjs/Observable";
import { Poll } from "app/models/poll";

@Component({
  selector: 'process-poll-results',
  templateUrl: './process-poll-results.component.html',
  styleUrls: ['./process-poll-results.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProcessPollResultsComponent implements OnInit {
  selectedPoll: Poll;
  polls: Poll[] = [];
  userPreferences: User[];
  userYesses: {} = {};
  userMaybes: {} = {};

  set selectedPollId(value: string) {
    this.selectedPoll = this.polls.find(p => p._id == value);
    this.appService.loadUserPreferences(value).subscribe(result => {
      this.userPreferences = result;
      this.userPreferences.forEach(u => {
        this.userYesses[u.name] = [];
        this.userMaybes[u.name] = [];
        u.preferences.shifts.forEach(week => {
          week.forEach(day => {
            if (!day.shifts) return;
            day.shifts.forEach(shift => {
              if (shift.isSelected)
                this.userYesses[u.name].push(`${day.date} ${shift.time}`);
              else if (shift.isSelected === null)
                this.userMaybes[u.name].push(`${day.date} ${shift.time}`);
            });
          });
        });
      });
    });
  }

  constructor(private appService: AppService) {
    this.appService.loadPolls()
      .subscribe((polls: Observable<any>) => {
        polls.forEach(p => this.polls.push(p));
      });
  }

  ngOnInit() {
  }

  getMonthView(month: string) {
    return parseInt(month) + 1;
  }

}
