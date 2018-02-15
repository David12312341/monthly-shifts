import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatListModule, MatSnackBar } from '@angular/material';
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
    this.appService.loadPolls().subscribe((polls: Poll[]) => {
      this.polls = polls;
    });
  }

  //TODO
  save(): void {
    this.snackBar.open("העדפותיך נשמרו", null, { duration: 3000, direction: "rtl" })    
  }

}
