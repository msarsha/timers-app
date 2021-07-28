import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TimerListComponent} from './timer-list/timer-list.component';
import {TimerListItemComponent} from './timer-list-item/timer-list-item.component';
import {NewTimerFormComponent} from './new-timer-form/new-timer-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import { RemainingTimeComponent } from './remaining-time/remaining-time.component';

@NgModule({
  declarations: [
    TimerListComponent,
    TimerListItemComponent,
    NewTimerFormComponent,
    RemainingTimeComponent
  ],
  exports: [
    TimerListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class TimersModule {
}
