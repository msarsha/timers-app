import { Pipe, PipeTransform } from '@angular/core';

const NO_TIME_STRING = '--:--:--';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {
  transform(value: number|null, showNoTimeString = false): string {
    if(value === 0 && showNoTimeString) {
      return NO_TIME_STRING;
    }

    return new Date(1000 * (value || 0)).toISOString().substr(11, 8);
  }
}
