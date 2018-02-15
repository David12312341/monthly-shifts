import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatListModule, MatSnackBar, MatSelectionList } from '@angular/material';
import { AppService } from "app/app.service";
import { Poll } from "app/models/poll";

@Component({
  selector: 'existing-polls',
  templateUrl: './existing-polls.component.html',
  styleUrls: ['./existing-polls.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ExistingPollsComponent implements OnInit {
  
  polls: Poll[] = [];
  
  constructor(private appService: AppService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.appService.loadPolls(false).subscribe((polls: Poll[]) => {
      this.polls = polls;
    });
  }
  
  getFullPollName(poll: Poll) {
    return `${poll.name} ${parseInt(poll.month) + 1}/${poll.year}`;;
  }

  save(list: MatSelectionList): void {
    list.options.forEach(option => this.polls.find(p => p._id == option.value).isArchived = option.selected);
    this.appService.savePollsArchive(this.polls);
    this.snackBar.open("העדפותיך נשמרו", null, { duration: 3000, direction: "rtl" })    
  }

}
