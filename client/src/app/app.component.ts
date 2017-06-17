import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppService } from "app/app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app works!';
  month: any;
  name: string;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.appService.getMonth(2017, 5)
      .subscribe((month) => {
        this.month = month;
        this.getMonth(2017, 5);
      });
  }

  saveUserPreference(): void {
    this.appService.saveUserPreferences({name: this.name, preferences: this.month});
  }

  getMonth(year: number, month: number) {
    let result = [];
    let firstOfMonth = new Date(year, month, 1);
    if (firstOfMonth.getDay() !== 0 && firstOfMonth.getDay() !== 6) {
      result.push([]);
      for (var i = 0; i < firstOfMonth.getDay(); i++) {
        result[0].push({});
      }
    }
    for (var i = 1; i <= new Date(year, month + 1, 0).getDate(); i++) {
      let current = new Date(year, month, i);
      let weekday = current.getDay();
      if (weekday === 6) continue;
      else if (weekday === 0) {
        result.push([]);
      }
      result[result.length - 1].push({
        date: `${i}/${month + 1}`,
        shifts: this.getShiftsByWeekday(weekday)
      });
    }
    return result;
  }

  getShiftsByWeekday(weekday: number) {
    switch (weekday) {
      case 0: return ["19:00-22:00"];
      case 1: return ["16:00-19:00", "19:00-22:00"];
      case 2: return ["16:00-19:00", "19:00-22:00"];
      case 3: return ["16:00-19:00", "19:00-22:00"];
      case 4: return ["13:00-16:00", "16:00-19:00", "19:00-22:00", "21:00-00:00"];
      case 5: return ["08:00-11:00", "11:00-14:00", "13:00-16:00"];
      default: return [];
    }
  }

}
