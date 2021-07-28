import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerListItemComponent } from './timer-list-item.component';

describe('CounterListItemComponent', () => {
  let component: TimerListItemComponent;
  let fixture: ComponentFixture<TimerListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimerListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
