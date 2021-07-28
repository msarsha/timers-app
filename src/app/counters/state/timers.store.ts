import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import {Timer} from "../models";
import {Injectable} from "@angular/core";

export interface TimersState extends EntityState<Timer, string> { }

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'timers' })
export class TimersStore extends EntityStore<TimersState> {
  constructor() {
    super([]) ;
  }
}
