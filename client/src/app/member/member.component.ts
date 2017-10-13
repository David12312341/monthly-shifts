import { Component, OnInit } from '@angular/core';
import { AppService } from "app/app.service";
import { MaterializeDirective } from 'angular2-materialize';
import { Observable } from "rxjs/Observable";
import { FormControl } from "@angular/forms";
import { User } from "app/models/user";
import { Poll } from "app/models/poll";

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

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
    let selectedUser = this.userPreferences.find(u => u.name == value);
    if (selectedUser) {
      this.selectedUser = selectedUser;
      this.selectedPoll = this.selectedUser.preferences;
    }
  }
  get selectedUserName():string {
    return this._selectedUserName;
  }

  set selectedPollId(value: string) {
    this.selectedPoll = this.polls.find(p => p._id == value);
    this.userNames = this.userPreferences.filter(u => u.preferences._id == value).map(u => u.name);
  }

  constructor(private appService: AppService) {
    this.appService.loadAllUserPreferences().subscribe(result => {
      this.userPreferences = result;
      this.appService.loadPolls()
        .subscribe((polls: Observable<any>) => {
          polls.forEach(p => this.polls.push(p));
          if (this.polls.length > 0) this.selectedPollId = this.polls[0]._id;
        });
    });
  }

  ngOnInit() {
  }

  getMonthView(month: string) {
    return parseInt(month) + 1;
  }

  saveUserPreference(): void {
    this.appService.saveUserPreferences({ name: this.selectedUserName, preferences: this.selectedPoll });
  }

}
