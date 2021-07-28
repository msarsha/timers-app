import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Timer} from "../models";
import {TimersService} from "../state/timers.service";
import {TimersQuery} from "../state/timers.query";

@Component({
  selector: 'app-timer-list',
  templateUrl: './timer-list.component.html',
  styleUrls: ['./timer-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerListComponent {
  timers$ = this.timersQuery.selectAll();
  longestTimer$ = this.timersQuery.longestTimer$;
  allPaused$ = this.timersQuery.areAllPaused$;

  constructor(private timersService: TimersService, private timersQuery: TimersQuery) {
  }

  onAdd(time: number) {
    this.timersService.create(time);
  }

  trackByFn(index: number, timer: Timer) {
    return timer.id;
  };

  onPauseAll() {
    this.timersService.pauseAll();
  }
}
