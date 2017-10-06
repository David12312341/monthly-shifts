import { Component, OnInit } from '@angular/core';
import { AppService } from "app/app.service";
import { MaterializeDirective } from 'angular2-materialize';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  userNames: any = {};
  userPreferences: any[];
  name: string;
  month: any;
  polls: any[] = [];
  selectedPoll: any;

  set selectedPollId(value: string) {
    this.selectedPoll = this.polls.find(p => p._id == value);
  }

  constructor(private appService: AppService) {
    this.loadAllUserPreferences();
    this.appService.loadPolls()
      .subscribe((polls: Observable<any>) => {
        polls.forEach(p => this.polls.push(p));
        if (this.polls.length > 0) this.selectedPoll = this.polls[0];
      });
    }
    
    ngOnInit() {
  }

  getMonthView(month: string) {
    return parseInt(month) + 1;
  }

  saveUserPreference(): void {
    this.appService.saveUserPreferences({ name: this.name, preferences: this.selectedPoll });
  }

  loadAllUserPreferences(): void {
    this.appService.loadAllUserPreferences().subscribe(result => {
      result.forEach(u => this.userNames[u.name] = null);
      this.userPreferences = result;
    });
  }

}
