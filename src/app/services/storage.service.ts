import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from '@ng-web-apis/common';

import { IOrderItem } from '../interfaces';


@Injectable({ providedIn: 'root' })
export class StorageService {

  constructor(@Inject(LOCAL_STORAGE) private readonly localStorage: Storage) { }

  public set = (key: string, value: IOrderItem[]): void => this.localStorage.setItem(key, JSON.stringify(value));

  public get = (key: string): IOrderItem[] => JSON.parse(this.localStorage.getItem(key) as string);

  public remove = (key: string): void => this.localStorage.removeItem(key);

}
