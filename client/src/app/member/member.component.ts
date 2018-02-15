import { Renderer2, ElementRef, Component, OnInit } from '@angular/core';
import { AppService } from "app/app.service";
import { Observable } from "rxjs/Observable";
import { FormControl } from "@angular/forms";
import { User } from "app/models/user";
import { Poll } from "app/models/poll";
import { MatSnackBar } from "@angular/material";
import { Shift } from "app/models/shift";
import { ShiftAssignments } from "app/models/shift-assignments";
import { UserAssignments } from "app/models/user-assignments";


@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  
  selectedUserAssignments: UserAssignments;
  assignments: ShiftAssignments;
  userNames: string[] = [];
  userPreferences: User[];
  month: any;
  polls: Poll[] = [];
  selectedPoll: Poll;
  _selectedUserName: string;
  selectedUser: User;

  set selectedUserName(value) {
    this._selectedUserName = value;
    this.userNames = this.userPreferences.filter(u => u.preferences._id == this.selectedPoll._id && u.name.includes(value)).map(u => u.name);
    let selectedUser = this.userPreferences.find(u => u.preferences._id == this.selectedPoll._id && u.name == value);
    if (selectedUser) {
      this.selectedUser = selectedUser;
      this.selectedPoll = this.selectedUser.preferences;
      this.selectedUserAssignments = this.assignments.assignments.find(assignment => assignment.name == this._selectedUserName);
    }
    else this.selectedUserAssignments = null;
  }
  get selectedUserName(): string {
    return this._selectedUserName;
  }

  set selectedPollId(value: string) {
    this.selectedPoll = this.polls.find(p => p._id == value);
    this.appService.loadUserPreferences(value).subscribe(result => {
      this.userPreferences = result
      this.userNames = this.userPreferences.map(u => u.name);
    });
    this.appService.loadShiftAssignments(this.selectedPoll._id, true).subscribe(assignments => this.assignments = assignments);    
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

  saveUserPreference(): void {
    this.appService.saveUserPreferences({ name: this.selectedUserName, preferences: this.selectedPoll });
    this.snackBar.open("העדפותיך נשמרו", null, { duration: 3000, direction: "rtl" })
  }

}
