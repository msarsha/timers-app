import {Injectable} from '@angular/core';
import {BehaviorSubject, interval, NEVER, Observable} from "rxjs";
import {map, startWith, switchMap, take, tap} from "rxjs/operators";
import {TimersStore} from "../state/timers.store";

@Injectable()
export class TimerService {

  private _pause$ = new BehaviorSubject(false);
  private _done$ = new BehaviorSubject(false);
  paused$ = this._pause$.asObservable();
  done$ = this._done$.asObservable();

  private elapsed = 0;
  private id!: string;

  constructor(private timersStore: TimersStore) {
  }

  startTimer(time: number, id: string): Observable<number> {
    this.elapsed = 0;
    this.id = id;
    return this.paused$
      .pipe(
        switchMap(paused => {
          return paused ? NEVER : this.createInterval();
        }),
        map(() => time - this.elapsed),
        startWith(time),
        take(time + 1),
        tap(currentTime => {
          if (currentTime === 0) {
            this._done$.next(true);
          }
          this.timersStore.update(id, {elapsed: this.elapsed});
        })
      );
  }

  toggleTimer(): void {
    this._pause$.next(!this._pause$.value);
    this.timersStore.update(this.id, {paused: this._pause$.value});
  }

  private createInterval(): Observable<number> {
    return interval(1000).pipe(tap(() => this.elapsed++));
  }
}
