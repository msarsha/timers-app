import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Timer} from "../models";

@Component({
  selector: 'app-remaining-time',
  templateUrl: './remaining-time.component.html',
  styleUrls: ['./remaining-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemainingTimeComponent implements OnInit {
  @Input() set activeTimers(timers: Timer[]) {
    this.setRemainingTime(timers);
  }

  remainingTime = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  private setRemainingTime(timers: Timer[]) {
    const times = timers.map(timer => timer.time);
    this.remainingTime = Math.max(...times);
  }
}
