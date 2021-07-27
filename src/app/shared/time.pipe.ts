import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {
  transform(value: number|null): string {
    return new Date(1000 * (value || 0)).toISOString().substr(11, 8)
  }
}
