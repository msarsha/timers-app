import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Timer} from "../models";
import {TimersService} from "../state/timers.service";
import {TimersQuery} from "../state/timers.query";

@Component({
  selector: 'app-counter-list',
  templateUrl: './counter-list.component.html',
  styleUrls: ['./counter-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterListComponent {
  timers$ = this.timersQuery.selectAll();
  longestTimer$ = this.timersQuery.longestTimer$;

  constructor(private timersService: TimersService, private timersQuery: TimersQuery) {
  }

  onAdd(time: number) {
    this.timersService.create(time);
  }

  trackByFn(index: number, timer: Timer) {
    return timer.id;
  };
}
