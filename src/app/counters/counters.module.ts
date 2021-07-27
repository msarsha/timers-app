import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CounterListComponent} from './counter-list/counter-list.component';
import {CounterListItemComponent} from './counter-list-item/counter-list-item.component';
import {CountersHeaderComponent} from './counters-header/counters-header.component';
import {NewCounterFormComponent} from './new-counter-form/new-counter-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import { RemainingTimeComponent } from './remaining-time/remaining-time.component';

@NgModule({
  declarations: [
    CounterListComponent,
    CounterListItemComponent,
    CountersHeaderComponent,
    NewCounterFormComponent,
    RemainingTimeComponent
  ],
  exports: [
    CounterListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CountersModule {
}
