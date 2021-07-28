import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTimerFormComponent } from './new-timer-form.component';

describe('NewCounterFormComponent', () => {
  let component: NewTimerFormComponent;
  let fixture: ComponentFixture<NewTimerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTimerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTimerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
