import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Timer} from "../models";
import {BehaviorSubject, interval, NEVER, Observable} from "rxjs";
import {
  map,
  startWith,
  switchMap,
  take,
  tap
} from "rxjs/operators";

@Component({
  selector: 'app-counter-list-item',
  templateUrl: './counter-list-item.component.html',
  styleUrls: ['./counter-list-item.component.scss']
})
export class CounterListItemComponent implements OnInit, OnDestroy {

  @Input() timer!: Timer;

  timer$!: Observable<number>;
  paused$ = new BehaviorSubject(false);
  buttonText$ = this.paused$.pipe(map(paused => paused ? 'Resume' : 'Pause'));

  elapsed = 0;

  ngOnInit(): void {
    this.timer$ = this.paused$
      .pipe(
        switchMap(paused => {
          return paused ? NEVER : this.createInterval();
        }),
        map(() => this.timer.time - this.elapsed),
        startWith(this.timer.time),
        take(this.timer.time + 1),
      );
  }

  ngOnDestroy(): void {
  }

  get done(){
    return this.elapsed === this.timer.time;
  }

  toggleTimer(): void {
    this.paused$.next(!this.paused$.value);
  }

  private createInterval(): Observable<number> {
    return interval(1000).pipe(tap(() => this.elapsed++));
  }
}
