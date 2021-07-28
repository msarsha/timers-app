import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import { TimerService } from './timer.service';
import {TimersQuery} from "../state/timers.query";
import {TimersStore} from "../state/timers.store";
import {Timer} from "../models";

describe('TimerService', () => {
  let service: TimerService;
  let query: TimersQuery;
  let store: TimersStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimerService, TimersQuery, TimersStore]
    });
    service = TestBed.inject(TimerService);
    query = TestBed.inject(TimersQuery);
    store = TestBed.inject(TimersStore);
  });

  it('starts a timer', fakeAsync(() => {
    const timer = startTimer();

    tick(2000);
    query.selectEntity(timer.id).subscribe(t => {
      expect(t?.elapsed).toBe(2);
    });
    service.pause();
  }));

  it('toggles a timer', fakeAsync(() => {
    const timer = startTimer();

    tick(2000);
    service.toggleTimer();
    tick(4000);
    service.toggleTimer();
    tick(1000);

    query.selectEntity(timer.id).subscribe(t => {
      expect(t?.elapsed).toBe(3);
    });

    service.pause();
  }));

  function startTimer(): Timer{
    const timer = {id: 'id', time: 10, elapsed: 0};
    store.add(timer);
    service.startTimer(timer.time, timer.id);

    return timer;
  }
});
