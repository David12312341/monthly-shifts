import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppService } from "app/app.service";
import { PollComponent } from './poll/poll.component';
import { MemberComponent } from './member/member.component';
import { ManagerComponent } from './manager/manager.component';
import { NewPollFormComponent } from './manager/new-poll-form/new-poll-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatSnackBarModule, MatCheckboxModule, MatTableModule, MatToolbarModule, MatAutocompleteModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatTooltipModule, MatProgressSpinnerModule } from '@angular/material';
import { RemarkDialogComponent } from './remark-dialog/remark-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PollComponent,
    MemberComponent,
    ManagerComponent,
    NewPollFormComponent,
    RemarkDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatTableModule,
    MatToolbarModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule
  ],
  entryComponents: [RemarkDialogComponent],
  exports: [],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
