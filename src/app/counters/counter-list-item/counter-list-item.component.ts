import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Timer} from "../models";
import {interval, Observable} from "rxjs";
import {map, startWith, take, tap} from "rxjs/operators";

@Component({
  selector: 'app-counter-list-item',
  templateUrl: './counter-list-item.component.html',
  styleUrls: ['./counter-list-item.component.scss']
})
export class CounterListItemComponent implements OnInit, OnDestroy {

  @Input() timer!: Timer;

  timer$!: Observable<number>;
  interval$ = interval(1000).pipe(
    // make interval emit immediately
    map(i => i + 1),
    startWith(0)
  );
  done = false;

  constructor() {
  }

  ngOnInit(): void {
    this.timer$ = this.interval$.pipe(
      map(interval => this.timer.time - interval),
      take(this.timer.time + 1),
      tap(interval => {
        this.done = interval === 0;
      }),
    );
  }

  ngOnDestroy(): void {
  }
}
