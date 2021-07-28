import {Injectable} from "@angular/core";
import {TimersStore} from "./timers.store";
import {Timer} from "../models";

@Injectable({providedIn: 'root'})
export class TimersService{
  constructor(private store: TimersStore) {
  }

  create(time: number) {
    const timer: Timer = {
      id: new Date().getTime().toString(),
      time,
      elapsed: 0
    };

    this.store.add(timer);
  }
}
