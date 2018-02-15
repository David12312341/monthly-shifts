import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingPollsComponent } from './existing-polls.component';

describe('ExistingPollsComponent', () => {
  let component: ExistingPollsComponent;
  let fixture: ComponentFixture<ExistingPollsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistingPollsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingPollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
