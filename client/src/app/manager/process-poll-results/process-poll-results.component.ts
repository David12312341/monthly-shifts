import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from "app/app.service";
import { User } from "app/models/user";
import { Observable } from "rxjs/Observable";
import { Poll } from "app/models/poll";
import { Selection } from "app/models/selection";
import { UserAssignments } from "app/models/user-assignments";
import { Shift } from "app/models/shift";
import { ShiftAssignments } from "app/models/shift-assignments";
import { MatSnackBar } from "@angular/material";

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
  selectionYesses: Selection[] = [];
  seletionMaybes: Selection[] = [];
  userYesses: Map<string, Selection[]> = new Map();
  userMaybes: Map<string, Selection[]> = new Map();
  shiftYesses: Map<string, Selection[]> = new Map();
  shiftMaybes: Map<string, Selection[]> = new Map();
  totalShifts: any[] = [];

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
              if (!this.shiftYesses[`${day.date} ${shift.time}`]) this.shiftYesses[`${day.date} ${shift.time}`] = [];
              if (!this.shiftMaybes[`${day.date} ${shift.time}`]) this.shiftMaybes[`${day.date} ${shift.time}`] = [];
              if (shift.isSelected) {
                let selection = new Selection(`${day.date} ${shift.time}`, u.name);
                this.userYesses[u.name].push(selection);
                this.shiftYesses[`${day.date} ${shift.time}`].push(selection);
              }
              else if (shift.isSelected === null) {
                let selection = new Selection(`${day.date} ${shift.time}`, u.name);
                this.userMaybes[u.name].push(selection);
                this.shiftMaybes[`${day.date} ${shift.time}`].push(selection);
              }
            });
          });
        });
      });
      this.populateTotalShifts();
      this.sortSelections();
    });
  }

  constructor(private appService: AppService, private snackBar: MatSnackBar) {
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

  private populateTotalShifts(): any {
    this.totalShifts.length = 0;
    this.selectedPoll.shifts.forEach(week => week.forEach(day => {
      if (day.shifts) day.shifts.forEach(shift => {
        if (this.shiftYesses[`${day.date} ${shift.time}`].length != 0 || this.shiftMaybes[`${day.date} ${shift.time}`] != 0)
          this.totalShifts.push({ time: `${day.date} ${shift.time}`, assignees: [] });
      });
    }));
  }

  sortSelections(): void {
    if (!this.userPreferences) return;
    this.userPreferences = this.userPreferences.sort((u1, u2) => {
      let u1Yesses: number = 0;
      let u2Yesses: number = 0;
      if (this.userYesses[u1.name].some(yes => yes.isSelected)) u1Yesses += 10000;
      if (this.userYesses[u2.name].some(yes => yes.isSelected)) u2Yesses += 10000;
      u1.preferences.shifts.forEach(week => week.forEach(day => u1Yesses += day.shifts ? day.shifts.filter(shift => shift.isSelected).length : 0));
      u2.preferences.shifts.forEach(week => week.forEach(day => u2Yesses += day.shifts ? day.shifts.filter(shift => shift.isSelected).length : 0));
      return u1Yesses - u2Yesses;
    });
    this.totalShifts = this.totalShifts.sort((s1, s2) => {
      let s1Yesses: number = 0;
      let s2Yesses: number = 0;
      if (this.shiftYesses[s1.time].concat(this.shiftMaybes[s1.time]).some(selection => selection.isSelected)) s1Yesses += 1000;
      if (this.shiftYesses[s2.time].concat(this.shiftMaybes[s2.time]).some(selection => selection.isSelected)) s2Yesses += 1000;
      s1Yesses += this.shiftYesses[s1.time].length;
      s2Yesses += this.shiftYesses[s2.time].length
      return s1Yesses - s2Yesses;
    });
  }

  publish(): void {
    let userAssignments: UserAssignments[] = [];
    for (const name in this.userYesses) {
      let assignments: Shift[] = [];
      if (this.userYesses.hasOwnProperty(name)) {
        const selections = this.userYesses[name];
        selections.concat(this.userMaybes[name]).filter(selection => selection.isSelected).forEach(selection => assignments.push({ isSelected: true, time: selection.option, remark: null }));
        userAssignments.push({ name: name, assignments: assignments });
      }
    }
    let shiftAssignments: ShiftAssignments = { pollId: this.selectedPoll._id, assignments: userAssignments };
    console.log(shiftAssignments);
    this.appService.publishAssignments(shiftAssignments);
    this.snackBar.open("השיבוצים פורסמו", null, { duration: 3000, direction: "rtl" })
  }

  saveDraft() {
    alert("saveDraft");
  }
}
