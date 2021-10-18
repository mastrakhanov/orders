import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

import { orderItemStub1, orderItemStub2 } from '../testing/order-item-stub';
import { MockStorageService } from '../testing/mock-storage.service';
import { StorageService } from './services/storage.service';

import { AppComponent } from './app.component';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let storageService: StorageService;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        MatFormFieldModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule
      ],
      providers: [{ provide: StorageService, useClass: MockStorageService }]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    storageService = TestBed.inject(StorageService);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should contain tags', () => {
    element = fixture.nativeElement;
    expect(element.innerHTML).toContain('form');
    expect(element.innerHTML).toContain('mat-form-field');
    expect(element.innerHTML).toContain('mat-datepicker');
    expect(element.innerHTML).toContain('mat-select');
    expect(element.innerHTML).toContain('input');
    expect(element.innerHTML).toContain('button');
  });

  it('should contain "Создать"', () => {
    element = fixture.nativeElement.querySelector('button');
    expect(element.textContent).toContain('Создать');
  });

  it('should contain "Удалить все заказы"', () => {
    element = fixture.nativeElement.querySelectorAll('button')[1];
    expect(element.textContent).toContain('Удалить все заказы');
  });

  it('should contain "Создать новый заказ"', () => {
    element = fixture.nativeElement.querySelector('h1');
    expect(element.textContent).toContain('Создать новый заказ');
  });

  it('should contain "Информация по заказам"', () => {
    element = fixture.nativeElement.querySelectorAll('h1')[1];
    expect(element.textContent).toContain('Информация по заказам');
  });

  it('should contain "Фильтровать (1 способ)"', () => {
    element = fixture.nativeElement.querySelector('p');
    expect(element.textContent).toContain('Фильтровать (1 способ)');
  });

  it('should contain "Фильтровать (2 способ)"', () => {
    element = fixture.nativeElement.querySelectorAll('p')[1];
    expect(element.textContent).toContain('Фильтровать (2 способ)');
  });

  it('should contain "Список заказов"', () => {
    element = fixture.nativeElement.querySelector('h2');
    expect(element.textContent).toContain('Список заказов');
  });

  it('should call storageService get()', () => {
    spyOn(storageService, 'get');
    component.ngOnInit();
    expect(storageService.get).toHaveBeenCalledTimes(1);
  });

  it('createForm should contain number, arrive, type controls', () => {
    expect(component.createForm.contains('number')).toBeTrue();
    expect(component.createForm.contains('arrive')).toBeTrue();
    expect(component.createForm.contains('type')).toBeTrue();
  });

  it('filterForm should contain formId, formNumber, formArrive, formType controls', () => {
    expect(component.filterForm.contains('formId')).toBeTrue();
    expect(component.filterForm.contains('formNumber')).toBeTrue();
    expect(component.filterForm.contains('formArrive')).toBeTrue();
    expect(component.filterForm.contains('formType')).toBeTrue();
  });

  it('sortForm should be truthy', () => {
    expect(component.sortForm).toBeTruthy();
  });

  it('should return displayOrders', (done) => {
    component.sortForm.setValue('id');
    component.ngOnInit();
    component.displayOrders$.subscribe(displayOrders => {
      expect(displayOrders).toEqual([orderItemStub1, orderItemStub2]);
      done();
    });
  });

  it('should return sorted displayOrders', (done) => {
    component.sortForm.setValue('id');
    component.direction$.next(true);
    component.ngOnInit();
    component.displayOrders$.subscribe(displayOrders => {
      expect(displayOrders).toEqual([orderItemStub2, orderItemStub1]);
      done();
    });
  });

  it('should return filtered displayOrders', (done) => {
    component.sortForm.setValue('id');
    component.filterForm.patchValue({ formId: '2' });
    component.ngOnInit();
    component.displayOrders$.subscribe(displayOrders => {
      expect(displayOrders).toEqual([orderItemStub2]);
      done();
    });
  });

  it('should call storageService set() and reset createForm', () => {
    spyOn(storageService, 'set');
    spyOn(component.createForm, 'reset');

    component.createForm.setValue({ number: 'number', arrive: new Date(0), type: 'RUEX' });
    component.submit();

    expect(storageService.set).toHaveBeenCalledTimes(1);
    expect(component.createForm.reset).toHaveBeenCalledTimes(1);
  });

  it('deleteOrders() should call storageService remove()', () => {
    spyOn(storageService, 'remove');
    component.deleteOrders();
    expect(storageService.remove).toHaveBeenCalledTimes(1);
  });

  it('should to be false', () => {
    expect(component.direction$.value).toBeFalse();
  });

  it('directionChange() should change direction$ value', () => {
    component.directionChange();
    expect(component.direction$.value).toBeTruthy();
  });
});
