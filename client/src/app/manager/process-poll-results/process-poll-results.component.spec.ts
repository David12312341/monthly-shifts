import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessPollResultsComponent } from './process-poll-results.component';

describe('ProcessPollResultsComponent', () => {
  let component: ProcessPollResultsComponent;
  let fixture: ComponentFixture<ProcessPollResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessPollResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessPollResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
