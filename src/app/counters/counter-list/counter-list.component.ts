import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Timer} from "../models";

@Component({
  selector: 'app-counter-list',
  templateUrl: './counter-list.component.html',
  styleUrls: ['./counter-list.component.scss']
})
export class CounterListComponent implements OnInit {

  timers$: BehaviorSubject<Timer[]> = new BehaviorSubject<Timer[]>([]);

  constructor() { }

  ngOnInit(): void {
  }

  onAdd(time: number) {
    this.timers$.next([...this.timers$.value, {time}]);
  }
}
