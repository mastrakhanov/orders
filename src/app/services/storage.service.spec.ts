import { TestBed } from '@angular/core/testing';

import { mockLocalStorage } from 'src/testing/mock-local-storage';
import { orderItemStub1 } from 'src/testing/order-item-stub';

import { StorageService } from './storage.service';


describe('StorageService', () => {
  let storageService: StorageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: StorageService, useFactory: () => new StorageService(mockLocalStorage) },
      ],
    });
    storageService = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(storageService).toBeTruthy();
  });

  it('get() should return values from localStorage', () => {
    mockLocalStorage.setItem('orders', JSON.stringify([orderItemStub1]));
    const result = storageService.get('orders');
    expect(result).toEqual([orderItemStub1]);
  });

  it('set() should add values into localStorage', () => {
    storageService.set('orders', [orderItemStub1]);
    const result = JSON.parse(mockLocalStorage.getItem('orders'));
    expect(result).toEqual([orderItemStub1]);
  });

  it('remove() should remove values from localStorage', () => {
    mockLocalStorage.setItem('orders', JSON.stringify([orderItemStub1]));
    storageService.remove('orders');
    const result = JSON.parse(mockLocalStorage.getItem('orders'));
    expect(result).toEqual(null);
  });
});
