import { Component, OnInit } from '@angular/core';
import { AppService } from "app/app.service";

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  name: string;
  month: any;
  
  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  saveUserPreference(): void {
    this.appService.saveUserPreferences({ name: this.name, preferences: this.month });
  }

}
