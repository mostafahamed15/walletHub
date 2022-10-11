/**
 * Update the following components to meet the requirements :
 * * Bind `field` of [textfield] component to its text input
 * * Pass value of `field` from [textfield] component to [title] property of component [ng-app]
 */

// I can bind with Output but I prefer behavior subject instead
import { Component, NgModule, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'textfield',
  template:
    '<input type="text" value="" [(ngModel)]="field" (keyup) = "getInputValue()"/>',
})
export class TextField {
  constructor(private service: SharedService) {}
  field: string = '';
  getInputValue() {
    this.service.getValue(this.field);
  }
}

@Component({
  selector: 'child-component',
  template: `<h2>
    Title:
    <h2><br /><textfield></textfield></h2>
  </h2>`,
})
export class ChildComponent {}

@Component({
  selector: 'ng-app',
  template: `<div>
    <child-component></child-component>
    <br />
    Title is {{ title }}
  </div>`,
})
export class Test02Component {
  title: string = '';
  constructor(private service: SharedService) {}

  ngOnInit() {
    this.service.currentValue.subscribe((title) => (this.title = title));
  }
}

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private inputValue = new BehaviorSubject<string>('');
  currentValue = this.inputValue.asObservable();

  constructor() {}

  getValue(field: string) {
    this.inputValue.next(field);
  }
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: Test02Component,
      },
    ]),
  ],
  declarations: [Test02Component, ChildComponent, TextField],
})
export class Test02Module {}
