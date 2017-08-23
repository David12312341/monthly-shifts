import { Component, OnInit, Input, Output } from '@angular/core';
import { AppService } from "app/app.service";

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {

  selectedShift: any;
  selectedRemark: string;
  @Input() managerMode: boolean;
  @Input() poll: any;

  constructor(private appService: AppService) {
  }

  ngOnInit() {
  }
  
  selectShiftForRemark(shift: any): void {
    this.selectedShift = shift;
    this.selectedRemark = shift.remark;
  }
}
