import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Timer} from "../models";
import {TimerService} from "../services/timer.service";
import {Observable, of} from "rxjs";
import {TimersQuery} from "../state/timers.query";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-remaining-time',
  templateUrl: './remaining-time.component.html',
  styleUrls: ['./remaining-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TimerService]
})
export class RemainingTimeComponent {
  @Output() pauseAll = new EventEmitter<void>();
  @Input() set timer(timer: Timer|null) {
    if (timer) {
      this.time$ = this.timersQuery.selectEntity(timer.id).pipe(
        map(timer => (timer!.time - timer!.elapsed))
      );
    } else {
      this.time$ = of(0);
    }
  };

  time$!: Observable<number>;

  constructor(private timersQuery: TimersQuery) {
  }

  onPauseAll() {
    this.pauseAll.emit();
  }
}
