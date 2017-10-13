import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { MaterializeModule } from 'angular2-materialize';

import { AppComponent } from './app.component';
import { AppService } from "app/app.service";
import { PollComponent } from './poll/poll.component';
import { MemberComponent } from './member/member.component';
import { ManagerComponent } from './manager/manager.component';
import { NewPollFormComponent } from './manager/new-poll-form/new-poll-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    PollComponent,
    MemberComponent,
    ManagerComponent,
    NewPollFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    MaterializeModule,
    BrowserAnimationsModule,
    MatAutocompleteModule
  ],
  exports: [MaterializeModule],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
