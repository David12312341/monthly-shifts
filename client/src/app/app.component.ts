import { Component, OnInit, Directive } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppService } from "app/app.service";
import { ScreenType } from "app/manager/screen-type";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private _isManager: boolean;

  screen: ScreenType;

  set isManager(value: boolean) {
    if (value) this.setManagerNavButtons();
    else this.setUserNavButtons();
    this._isManager = value;
  }

  get isManager(): boolean {
    return this._isManager;
  }

  navButtons: object[];

  constructor() { }

  ngOnInit(): void {
    this.setUserNavButtons();
  }

  setUserNavButtons(): void {
    this.navButtons = [
      {
        caption: "ניהול",
        action: () => this.isManager = true
      }
    ]
  }

  setManagerNavButtons(): void {
    this.navButtons = [
      {
        caption: "חזרה",
        action: () => this.isManager = false
      },
      {
        caption: "סקר חדש",
        action: () => this.screen = ScreenType.NewPoll
      }
    ]
  }

}
