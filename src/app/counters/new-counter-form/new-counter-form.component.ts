import {EventEmitter} from '@angular/core';
import {Component, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-counter-form',
  templateUrl: './new-counter-form.component.html',
  styleUrls: ['./new-counter-form.component.scss']
})
export class NewCounterFormComponent {
  @Output() add = new EventEmitter<number>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      time: ['', Validators.pattern("^[0-9]*$")]
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
