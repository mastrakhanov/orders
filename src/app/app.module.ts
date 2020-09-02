import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import {DesktopComponent} from './widgets/desktop/desktop.component';
import {FilterIdPipe} from './widgets/pipes/filterId.pipe';
import {FilterNumberPipe} from './widgets/pipes/filterNumber.pipe';
import {FilterTypePipe} from './widgets/pipes/filterType.pipe';
import {FilterArrPipe} from './widgets/pipes/filterArr.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DesktopComponent,
    FilterIdPipe,
    FilterNumberPipe,
    FilterArrPipe,
    FilterTypePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
