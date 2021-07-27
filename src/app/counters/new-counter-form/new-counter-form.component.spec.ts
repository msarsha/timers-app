import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCounterFormComponent } from './new-counter-form.component';

describe('NewCounterFormComponent', () => {
  let component: NewCounterFormComponent;
  let fixture: ComponentFixture<NewCounterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCounterFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCounterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
