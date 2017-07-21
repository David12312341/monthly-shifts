import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPollFormComponent } from './new-poll-form.component';

describe('NewPollFormComponent', () => {
  let component: NewPollFormComponent;
  let fixture: ComponentFixture<NewPollFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPollFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPollFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
