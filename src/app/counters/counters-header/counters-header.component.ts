import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-counters-header',
  templateUrl: './counters-header.component.html',
  styleUrls: ['./counters-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountersHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
