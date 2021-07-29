import {Injectable} from '@angular/core';
import {BehaviorSubject, interval, NEVER, Observable} from "rxjs";
import {map, startWith, switchMap, take, tap} from "rxjs/operators";
import {TimersStore} from "../state/timers.store";
import {TimerController, TimersService} from "../state/timers.service";

@Injectable()
export class TimerService {
  private _toggle$ = new BehaviorSubject(false);
  private toggle$ = this._toggle$.pipe(tap((paused) => {
    this.timersStore.update(this.id, {paused});
  }))

  private elapsed = 0;
  private id = '';

  constructor(private timersStore: TimersStore, private timersService: TimersService) {
  }

  startTimer(time: number, id: string): void {
    this.elapsed = 0;
    this.id = id;
    this.registerController();

    this.toggle$
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
    this._toggle$.next(!this._toggle$.value);
  }

  pause(){
    this._toggle$.next(true);
  }

  resume(){
    this._toggle$.next(false);
  }

  private createInterval(): Observable<number> {
    return interval(1000).pipe(tap(() => this.elapsed++));
  }

  private registerController() {
    const controller: TimerController = {
      pause: () => this.pause(),
      resume: () => this.resume()
    };

    this.timersService.registerController(this.id, controller);
  }
}
