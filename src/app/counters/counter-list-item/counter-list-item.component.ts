import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Timer} from "../models";
import {BehaviorSubject, interval, NEVER, Observable} from "rxjs";
import {
  map, shareReplay,
  startWith,
  switchMap,
  take,
  tap
} from "rxjs/operators";
import {TimerService} from "../services/timer.service";

@Component({
  selector: 'app-counter-list-item',
  templateUrl: './counter-list-item.component.html',
  styleUrls: ['./counter-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TimerService]
})
export class CounterListItemComponent implements OnInit {
  @Input() timer!: Timer;
  @Output() pause = new EventEmitter<boolean>();

  timer$!: Observable<number>;
  done$ = this.timerService.done$.pipe(shareReplay(1));
  paused$ = this.timerService.paused$.pipe(
    tap((paused) => {
      this.pause.emit(paused);
    })
  );
  buttonText$ = this.paused$.pipe(
    map(paused => paused ? 'Resume' : 'Pause')
  );

  elapsed = 0;

  constructor(private timerService: TimerService) {}

  ngOnInit(): void {
    this.timer$ = this.timerService.createTimer(this.timer.time);
  }

  toggleTimer(): void {
    this.timerService.toggleTimer();
  }
}
