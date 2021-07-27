import {Injectable} from '@angular/core';
import {BehaviorSubject, interval, NEVER, Observable} from "rxjs";
import {map, startWith, switchMap, take, tap} from "rxjs/operators";

@Injectable()
export class TimerService {

  private _pause$ = new BehaviorSubject(false);
  private _done$ = new BehaviorSubject(false);
  paused$ = this._pause$.asObservable();
  done$ = this._done$.asObservable();

  elapsed = 0;

  createTimer(time: number): Observable<number> {
    return this.paused$
      .pipe(
        switchMap(paused => {
          return paused ? NEVER : this.createInterval();
        }),
        map(() => time - this.elapsed),
        startWith(time),
        take(time + 1),
        tap(currentTime => {
          if(currentTime === 0) {
            this._done$.next(true);
          }
        })
      );
  }

  toggleTimer(): void {
    this._pause$.next(!this._pause$.value);
  }

  private createInterval(): Observable<number> {
    return interval(1000).pipe(tap(() => this.elapsed++));
  }
}
