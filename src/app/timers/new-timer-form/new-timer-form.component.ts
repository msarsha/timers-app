import {ChangeDetectionStrategy, EventEmitter} from '@angular/core';
import {Component, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-timer-form',
  templateUrl: './new-timer-form.component.html',
  styleUrls: ['./new-timer-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTimerFormComponent {
  @Output() add = new EventEmitter<number>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      time: ['', [Validators.pattern("^[0-9]*$"), Validators.required]]
    });
  }

  get timeControl(): FormControl{
    return this.form.get('time') as FormControl;
  }

  addTime() {
    if(this.form.valid){
      this.add.emit(Number(this.form.value['time']));
      this.form.reset();
    }
  }
}
