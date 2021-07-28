import {Injectable} from '@angular/core';
import {BehaviorSubject, interval, NEVER, Observable} from "rxjs";
import {map, startWith, switchMap, take, tap} from "rxjs/operators";
import {TimersStore} from "../state/timers.store";

@Injectable()
export class TimerService {
  private _pause$ = new BehaviorSubject(false);

  private elapsed = 0;
  private id = '';

  constructor(private timersStore: TimersStore) {
  }

  startTimer(time: number, id: string): void {
    this.elapsed = 0;
    this.id = id;
    this._pause$
      .pipe(
        switchMap(paused => {
          return paused ? NEVER : this.createInterval();
        }),
        map(() => time - this.elapsed),
        startWith(time),
        take(time + 1),
        tap(() => {
          this.timersStore.update(id, {elapsed: this.elapsed});
        })
      ).subscribe();
  }

  toggleTimer(): void {
    this._pause$.next(!this._pause$.value);
    this.timersStore.update(this.id, {paused: this._pause$.value});
  }

  private createInterval(): Observable<number> {
    return interval(1000).pipe(tap(() => this.elapsed++));
  }
}
