import { orderItemStub1, orderItemStub2 } from 'src/testing/order-item-stub';
import { IFilterPipeOptions, IOrderItem } from '../interfaces';

import { FilteringPipe } from './filtering.pipe';


describe('FilteringSortingPipe', () => {
  let filteringSortingPipe: FilteringPipe;

  beforeEach(() => {
    filteringSortingPipe = new FilteringPipe();
  });

  it('should create', () => {
    expect(filteringSortingPipe).toBeTruthy();
  });

  it('should return filtered ordersStub', () => {
    const ordersStub: IOrderItem[] = [orderItemStub1, orderItemStub2];
    const options1: IFilterPipeOptions = {
      field: 'id',
      value: '1'
    };

    expect(filteringSortingPipe.transform(ordersStub, options1)).toEqual([orderItemStub1]);

    const options2: IFilterPipeOptions = {
      field: 'id',
      value: '2'
    };

    expect(filteringSortingPipe.transform(ordersStub, options2)).toEqual([orderItemStub2]);
  });
});
