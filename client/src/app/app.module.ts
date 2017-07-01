import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppService } from "app/app.service";
import { PollComponent } from './poll/poll.component';
import { MemberComponent } from './member/member.component';
import { ManagerComponent } from './manager/manager.component';

@NgModule({
  declarations: [
    AppComponent,
    PollComponent,
    MemberComponent,
    ManagerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
