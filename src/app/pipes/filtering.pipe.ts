import { Pipe, PipeTransform } from '@angular/core';

import { IFilterPipeOptions, IOrderItem } from '../interfaces';


@Pipe({
  name: 'filteringPipe'
})

export class FilteringPipe implements PipeTransform {

  transform(result: IOrderItem[] | undefined, options: IFilterPipeOptions): IOrderItem[] | undefined {

    let myOptions: IFilterPipeOptions = options;

    if (options.field === 'arrive' && options.value !== '') {
      myOptions = { ...options, value: options.value?.toISOString() };
    }

    if (!myOptions.value?.trim()) {
      return result;
    }

    if (!result) {
      return;
    }

    return result?.filter((item) => (item as any)[myOptions.field].toLowerCase().includes(myOptions.value.toLowerCase()));

  }

}
