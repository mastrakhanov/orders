import {Pipe, PipeTransform} from '@angular/core';
import {Result} from '../desktop/desktop.component';

@Pipe({
  name: 'filterPipeType'
})

export class FilterTypePipe implements PipeTransform{
  transform(result: Result[], search = ''): Result[] {
    if (!search.trim()) {
      return result;
    }
    if (!result) {
      return;
    }
    return result.filter((item) => {
      return item.type.toLowerCase().includes(search.toLowerCase());
    });
  }
}
