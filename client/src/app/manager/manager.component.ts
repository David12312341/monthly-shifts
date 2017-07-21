import { Component, OnInit, Input, Injectable } from '@angular/core';
import { ScreenType } from "app/manager/screen-type";

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  
  @Input() screen: ScreenType;
  screenType = ScreenType;
  
  constructor() { }

  ngOnInit() {
  }

}
