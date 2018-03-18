import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from "app/app.service";
import { User } from "app/models/user";
import { SortPreferencesBy } from "app/models/sort-preferences-by";
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
  userYesses: Map<string, Selection[]> = new Map();
  userMaybes: Map<string, Selection[]> = new Map();
  shiftYesses: Map<string, Selection[]> = new Map();
  shiftMaybes: Map<string, Selection[]> = new Map();
  totalShifts: any[] = [];
  sortBy: SortPreferencesBy = SortPreferencesBy.Amount;
  SortPreferencesBy = SortPreferencesBy;

  set selectedPollId(value: string) {
    this.selectedPoll = this.polls.find(p => p._id == value);
    this.clearSelections();    
    this.populateAssignments(value);
  }

  constructor(private appService: AppService, private snackBar: MatSnackBar) {
    this.appService.loadPolls()
      .subscribe((polls: Poll[]) => {
        polls.forEach(p => this.polls.push(p));
      });
  }

  ngOnInit() {
  }

  getMonthView(month: string) {
    return parseInt(month) + 1;
  }

  clearSelections(): any {
    this.shiftYesses = new Map();
    this.shiftMaybes = new Map();
    this.userYesses = new Map();
    this.userMaybes = new Map();
  }

  /**
   * Get user preferences and previously saved assignments for this poll and populate relevant members.
   * @param pollId ID of selected poll
   */
  populateAssignments(pollId: string): void {
    this.appService.loadShiftAssignments(pollId, false).subscribe(shiftAssignments => {
      this.appService.loadUserPreferences(pollId).subscribe(result => {
        this.userPreferences = result;
        this.userPreferences.forEach(u => {
          this.userYesses[u.name] = [];
          this.userMaybes[u.name] = [];
          u.preferences.shifts.forEach(week => {
            week.forEach(day => {
              if (!day.shifts) return;
              day.shifts.forEach(shift => {
                let shiftTime = `${day.date} ${shift.time}`;
                if (!this.shiftYesses[shiftTime]) this.shiftYesses[shiftTime] = [];
                if (!this.shiftMaybes[shiftTime]) this.shiftMaybes[shiftTime] = [];
                this.addSelection(shift, shiftTime, u, shiftAssignments);
              });
            });
          });
        });
        this.populateTotalShifts();
        this.sortSelections();
      });
    });
  }

  /**
   * Adds a selection for a relevant shift and a relevant user
   * @param shift relevant shift
   * @param shiftTime used as a key
   * @param user relevant user
   * @param shiftAssignments holds assignment data for the selection.
   */
  addSelection(shift: Shift, shiftTime: string, user: User, shiftAssignments: ShiftAssignments): void {
    let selection = new Selection(shiftTime, user.name);
    let userAssignments: UserAssignments = shiftAssignments && shiftAssignments.assignments.find(userAssignments => userAssignments.name == user.name);
    let assignedShift = userAssignments && userAssignments.assignments.find(s => s.time == shiftTime);
    selection.isSelected = assignedShift && assignedShift.isSelected;
    if (shift.isSelected) {
      this.userYesses[user.name].push(selection);
      this.shiftYesses[shiftTime].push(selection);
    }
    else if (shift.isSelected === null) {
      this.userMaybes[user.name].push(selection);
      this.shiftMaybes[shiftTime].push(selection);
    }
  }

  private populateTotalShifts(): any {
    this.totalShifts = [];
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

  save(publish: boolean): void {
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
    this.appService.saveAssignments(shiftAssignments, publish);
    if (publish) this.snackBar.open("השיבוצים פורסמו", null, { duration: 3000, direction: "rtl" });
    else this.snackBar.open("השיבוצים נשמרו כטיוטא, ולא פורסמו", null, { duration: 3000, direction: "rtl" });
  }
}
