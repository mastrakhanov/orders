export interface IOrderItem {
  id: string;
  number: string;
  arrive: string;
  dateTime: string;
  type: string;
}

export interface ISorting {
  field: string;
  descending: boolean;
}

export interface IFilterPipeOptions {
  field: string;
  value: any;
}
