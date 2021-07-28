import {Injectable} from "@angular/core";
import {TimersStore} from "./timers.store";
import {Timer} from "../models";

export interface TimerController{
  pause: () => void;
  resume: () => void;
}

@Injectable({providedIn: 'root'})
export class TimersService{
  private controllers = new Map<string, TimerController>();

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

  pauseAll(){
    this.controllers.forEach((ctrl: TimerController) => ctrl.pause());
  }

  registerController(id: string, controller: TimerController){
    this.controllers.set(id, controller)
  }
}
