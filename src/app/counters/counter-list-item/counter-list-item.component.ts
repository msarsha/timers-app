import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Timer} from "../models";
import {Observable} from "rxjs";
import {
  map,
} from "rxjs/operators";
import {TimerService} from "../services/timer.service";
import {TimersQuery} from "../state/timers.query";

@Component({
  selector: 'app-counter-list-item',
  templateUrl: './counter-list-item.component.html',
  styleUrls: ['./counter-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TimerService]
})
export class CounterListItemComponent implements OnInit {
  @Input() timer!: Timer;

  timer$!: Observable<Timer | undefined>;
  time$!: Observable<number>;
  done$!: Observable<boolean>;
  paused$!: Observable<boolean>;
  buttonText$!: Observable<string>;

  constructor(private timerService: TimerService, private timersQuery: TimersQuery) {
  }

  ngOnInit(): void {
    this.initTimer();
  }

  toggleTimer(): void {
    this.timerService.toggleTimer();
  }

  private initTimer(): void {
    this.timer$ = this.timersQuery.selectEntity(this.timer.id);
    this.time$ = this.timer$.pipe(map(timer => timer ? (timer.time - timer.elapsed) : 0));
    this.done$ = this.time$.pipe(map((t) => t === 0));
    this.paused$ = this.timer$.pipe(map(t => Boolean(t?.paused)));
    this.buttonText$ = this.paused$.pipe(
      map(paused => paused ? 'Resume' : 'Pause')
    );
    this.timerService.startTimer(this.timer.time, this.timer.id);
  }
}
