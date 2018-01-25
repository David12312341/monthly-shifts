import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from "app/app.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SettingsComponent implements OnInit {

  email: string;
  doneLoading: boolean;

  constructor(private appService: AppService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.appService.loadSettings().subscribe(res => {
      this.email = res.email;
      this.doneLoading = true;
    });
  }

  saveSettings(): void {
    this.appService.saveSettings({ email: this.email });
    this.snackBar.open("העדפותיך נשמרו", null, { duration: 2000, direction: "rtl"});
  }

}
