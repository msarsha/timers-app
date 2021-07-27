import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterListItemComponent } from './counter-list-item.component';

describe('CounterListItemComponent', () => {
  let component: CounterListItemComponent;
  let fixture: ComponentFixture<CounterListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
