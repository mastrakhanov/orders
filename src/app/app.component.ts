import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BehaviorSubject, combineLatest, EMPTY, merge, Observable, of, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import { IOrderItem, ISorting } from './interfaces';
import { StorageService } from './services/storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {

  createForm = new FormGroup({
    number: new FormControl('', Validators.required),
    arrive: new FormControl('', Validators.required),
    type: new FormControl(null, Validators.required)
  });

  filterForm = new FormGroup({
    formId: new FormControl(''),
    formNumber: new FormControl(''),
    formArrive: new FormControl(''),
    formType: new FormControl(null)
  });

  sortForm = new FormControl(null);

  filterOrderId = '';
  filterOrderNumber = '';
  filterOrderArrive = '';
  filterOrderType: string | null = null;

  displayOrders$: Observable<IOrderItem[]> = EMPTY;

  direction$ = new BehaviorSubject<boolean>(false);
  private sortField$ = new BehaviorSubject<ISorting>({ field: '', descending: false });
  private storageOrders$ = new BehaviorSubject<IOrderItem[]>([]);

  private sortSub: Subscription | null = null;

  constructor(private readonly storageService: StorageService) { }

  ngOnInit(): void {
    this.storageOrders$.next(this.storageService.get('orders'));

    this.sortSub = combineLatest([
      merge(this.sortForm.valueChanges, of(this.sortForm.value)),
      this.direction$
    ]).subscribe(([field, direction]) => this.sortField$.next({ field, descending: !direction }));

    this.displayOrders$ = combineLatest([
      this.storageOrders$,
      merge(this.filterForm.valueChanges, of(this.filterForm.value)),
      this.sortField$
    ])
      .pipe(
        debounceTime(300),
        map(([ storageOrders, { formId, formNumber, formArrive, formType }, { field, descending } ]) => ({
          orders: storageOrders
            ?.filter(item => formId ? item.id.toLowerCase().includes(formId.toLowerCase()) : true)
            .filter(item => formNumber ? item.number.toLowerCase().includes(formNumber.toLowerCase()) : true)
            .filter(item => formArrive ? item.arrive === formArrive.toISOString() : true)
            .filter(item => formType ? item.type === formType : true)
            .sort((a, b) => {
              if (field === 'type') {
                return descending
                  ? a[field] > b[field] ? 1 : -1
                  : a[field] > b[field] ? -1 : 1;
              } else {
                return descending
                  ? Number((a as any)[field]) - Number((b as any)[field])
                  : Number((b as any)[field]) - Number((a as any)[field]);
              }
            }),
          save: !formId && !formNumber && !formArrive && !formType && !!field
        })),
        map(({ orders, save }) => {
          if (save) {
            this.storageService.set('orders', orders);
          }

          return orders;
        })
      );
  }

  ngOnDestroy(): void {
    if (this.sortSub) { this.sortSub.unsubscribe(); }
  }

  submit(): void {
    let id: number;
    const orders = this.storageOrders$.value || [];

    if (!orders.length) {
      id = 0;
    } else {
      id = Number(orders.reduce((max, current) => +current.id > max ? +current.id : max, 0));
    }

    const item: IOrderItem = {
      id: (id + 1).toString(),
      number: this.createForm.value.number,
      arrive: (this.createForm.value.arrive as Date).toISOString(),
      type: this.createForm.value.type,
      dateTime: new Date().getTime().toString()
    };

    orders.push(item);

    this.storageOrders$.next(orders);
    this.storageService.set('orders', orders);

    this.createForm.reset();
  }

  onDrop(event: CdkDragDrop<any[], any>, orders: IOrderItem[]): void {
    event.previousContainer === event.container
      ? moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
      : transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);

    this.sortForm.setValue('');
    this.sortField$.next({ field: '', descending: false });
    this.storageOrders$.next(orders);

    if (
      !this.filterForm.value.formId
      && !this.filterForm.value.formArrive
      && !this.filterForm.value.formNumber
      && !this.filterForm.value.formType
    ) {
      this.storageService.set('orders', orders);
    }
  }

  deleteOrders(): void {
    this.storageService.remove('orders');
    this.storageOrders$.next([]);
  }

  directionChange(): void {
    this.direction$.next(!this.direction$.value);
  }
}
