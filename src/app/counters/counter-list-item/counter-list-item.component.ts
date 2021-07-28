import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Timer} from "../models";
import {Observable} from "rxjs";
import {
  map, shareReplay,
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

  timer$!: Observable<number>;
  done$ = this.timerService.done$.pipe(shareReplay(1));
  paused$ = this.timerService.paused$;
  buttonText$ = this.paused$.pipe(
    map(paused => paused ? 'Resume' : 'Pause')
  );

  constructor(private timerService: TimerService) {
  }

  ngOnInit(): void {
    this.timer$ = this.timerService.startTimer(this.timer.time, this.timer.id);
  }

  toggleTimer(): void {
    this.timerService.toggleTimer();
  }
}
