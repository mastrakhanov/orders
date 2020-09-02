import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

export interface Result {
  id: string;
  number: string;
  arrive: string;
  date: any;
  type: string;
}

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnInit {

  form: FormGroup;
  formFilter: FormGroup;
  id: number = 0;
  mas = [];
  result: Result[] = [];
  isDownId = true;
  isDownDate = true;
  isDownType = true;
  filterIdStr = '';
  filterNumStr = '';
  filterArrStr = '';
  filterTypeStr = '';
  filtered = false;

  ngOnInit() {
    this.form = new FormGroup({
      number: new FormControl('', Validators.required),
      arrive: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required)
    });
    this.formFilter = new FormGroup({
      form_id: new FormControl(''),
      form_number: new FormControl(''),
      form_arrive: new FormControl(''),
      form_type: new FormControl('')
    });
    if (this.result == null) {
      return;
    } else {
      this.result = JSON.parse(localStorage.getItem('zak'));
    }
  }

  submit() {
    this.result = JSON.parse(localStorage.getItem('zak'));
    if (this.result === null) {
      this.id = 0;
    } else {
      this.id = Number(this.result.reduce((max, current) => +current.id > max ? current.id : max, 0));
    }
    const item = {
      id: (this.id + 1).toString(),
      number: this.form.value.number,
      arrive: this.form.value.arrive,
      type: this.form.value.type,
      date: new Date().getTime()
    };
    if (this.result === null) {
      this.mas.push(item);
    } else {
      this.mas = JSON.parse(localStorage.getItem('zak'));
      this.mas.push(item);
    }
    localStorage.setItem('zak', JSON.stringify(this.mas));
    this.result = JSON.parse(localStorage.getItem('zak'));
    this.form.reset();
  }

  onDrop(event: CdkDragDrop<any[], any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    if (!this.filtered) {
      localStorage.setItem('zak', JSON.stringify(this.result));
    }
  }

  sortByDate() {
    if (this.isDownDate) {
      this.result = this.result.sort((a, b) => b.date - a.date);
    } else {
      this.result = this.result.sort((a, b) => a.date - b.date);
    }
    if (!this.filtered) {
      localStorage.setItem('zak', JSON.stringify(this.result));
      this.result = JSON.parse(localStorage.getItem('zak'));
    }
  }

  sortByType() {
    if (this.isDownType) {
      this.result = this.result.slice().sort((a, b) => a.type > b.type ? 1 : -1);
    } else {
      this.result = this.result.slice().sort((a, b) => a.type > b.type ? -1 : 1);
    }
    if (!this.filtered) {
      localStorage.setItem('zak', JSON.stringify(this.result));
      this.result = JSON.parse(localStorage.getItem('zak'));
    }
  }

  sortById() {
    if (this.isDownId) {
      this.result = this.result.sort((a, b) => +b.id - +a.id);
    } else {
      this.result = this.result.sort((a, b) => +a.id - +b.id);
    }
    if (!this.filtered) {
      localStorage.setItem('zak', JSON.stringify(this.result));
      this.result = JSON.parse(localStorage.getItem('zak'));
    }
  }

  deleteAllZak () {
    localStorage.clear();
    this.result = this.result = JSON.parse(localStorage.getItem('zak'));
  }

  filter() {
    this.result = JSON.parse(localStorage.getItem('zak'));
    if (this.formFilter.value.form_id) {
      this.result = this.result.filter((item) => {return item.id.toLowerCase().includes(this.formFilter.value.form_id.toLowerCase())});
    }
    if (this.formFilter.value.form_number) {
      this.result = this.result.filter((item) => {return item.number.toLowerCase().includes(this.formFilter.value.form_number.toLowerCase())});
    }
    if (this.formFilter.value.form_arrive) {
      this.result = this.result.filter((item) => {return item.arrive.toLowerCase().includes(this.formFilter.value.form_arrive.toLowerCase())});
    }
    if (this.formFilter.value.form_type) {
      this.result = this.result.filter((item) => {return item.type.toLowerCase().includes(this.formFilter.value.form_type.toLowerCase())});
    }

    this.filtered = !(!this.formFilter.value.form_id && !this.formFilter.value.form_number && !this.formFilter.value.form_arrive && !this.formFilter.value.form_type);
  }
}
