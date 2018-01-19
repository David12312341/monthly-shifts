import { Component, OnInit, Directive } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppService } from "app/app.service";
import { ScreenType } from "app/manager/screen-type";

@Component({
  selector: 'app-root',
  host: { '(window:keydown)': 'hotkeyDown($event)', '(window:keyup)': 'hotkeyUp($event)' },
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private _isCtrlDown: boolean;
  private _isManager: boolean;
  screen: ScreenType;

  set isManager(value: boolean) {
    if (value) this.setManagerNavButtons();
    else this.displayManagementButton();
    this._isManager = value;
  }

  get isManager(): boolean {
    return this._isManager;
  }

  navButtons: object[];

  constructor() { }

  ngOnInit(): void {
  }

  displayManagementButton(): void {
    this.navButtons = [
      {
        caption: "ניהול",
        action: () => this.isManager = true
      }
    ];
  }

  setManagerNavButtons(): void {
    this.navButtons = [
      {
        caption: "סקר חדש",
        action: () => this.screen = ScreenType.NewPoll
      },
      {
        caption: "עיבוד",
        action: () => this.screen = ScreenType.ProcessPollResults
      },
      {
        caption: "יציאה",
        action: () => this.isManager = false
      }
    ];
  }

  hotkeyDown(event: KeyboardEvent) {
    if (event.keyCode == 17) this._isCtrlDown = true;
    if (event.keyCode == 192 && this._isCtrlDown) this.displayManagementButton();
  }

  hotkeyUp(event: KeyboardEvent) {
    if (event.keyCode == 17) this._isCtrlDown = false;
  }

}
