import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountersHeaderComponent } from './counters-header.component';

describe('CountersHeaderComponent', () => {
  let component: CountersHeaderComponent;
  let fixture: ComponentFixture<CountersHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountersHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountersHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
