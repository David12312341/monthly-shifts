import { Component, OnInit, Input } from '@angular/core';
import { AppService } from "app/app.service";

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {

  @Input() public month: any;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.getMonth(2017, 5)
      .subscribe((month) => {
        this.month = month;
      });
  }
}
