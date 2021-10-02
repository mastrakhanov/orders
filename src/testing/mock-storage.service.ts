import { orderItemStub1, orderItemStub2 } from './order-item-stub';
import { IOrderItem } from '../app/interfaces';


export class MockStorageService {

  set = (key: string, value: IOrderItem[]): void => null;

  get = (key: string): IOrderItem[] => ([orderItemStub1, orderItemStub2]);

  remove = (key: string): void => null;

}
