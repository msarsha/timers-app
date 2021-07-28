import {QueryEntity} from '@datorama/akita';
import {TimersState, TimersStore} from "./timers.store";
import {Injectable} from "@angular/core";
import {distinctUntilChanged, map, switchMap, take} from "rxjs/operators";
import {Timer} from "../models";

@Injectable({
  providedIn: 'root'
})
export class TimersQuery extends QueryEntity<TimersState> {
  activeTimers$ = this.selectAll().pipe(
    map(timers => timers.filter(timer => !timer.paused))
  );

  numberOfActiveTimers$ = this.activeTimers$.pipe(
    map(timers => timers.length)
  ).pipe(distinctUntilChanged());

  longestTimer$ = this.numberOfActiveTimers$
    .pipe(
      switchMap(() => this.activeTimers$.pipe(take(1))),
      map(activeTimers => {
        return activeTimers.sort((timer1, timer2) => {
          return this.calcRemainingTime(timer2) - this.calcRemainingTime(timer1);
        })[0];
      })
    );

  constructor(protected store: TimersStore) {
    super(store);
  }

  private calcRemainingTime(timer: Timer): number {
    return timer.time - timer.elapsed;
  }
}
