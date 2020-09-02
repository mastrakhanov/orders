import {Pipe, PipeTransform} from '@angular/core';
import {Result} from '../desktop/desktop.component';

@Pipe({
  name: 'filterPipeId'
})

export class FilterIdPipe implements PipeTransform{
  transform(result: Result[], search = ''): Result[] {
    if (!search.trim()) {
      return result;
    }
    if (!result) {
      return;
    }
    return result.filter((item) => {
      return item.id.toLowerCase().includes(search.toLowerCase());
    });
  }
}
