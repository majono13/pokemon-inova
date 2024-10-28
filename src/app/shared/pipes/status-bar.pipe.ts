import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusBar'
})
export class StatusBarPipe implements PipeTransform {

  transform(value: number): any {
    const totalWidth = 100;
    const width = value >= totalWidth ? totalWidth : value
    return `width: ${width}%;`;
  }

}
