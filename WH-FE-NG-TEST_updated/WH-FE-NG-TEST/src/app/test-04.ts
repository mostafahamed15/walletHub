/**
 * Add 2 input forms in the following component for first name and last name. Once both forms are filled out by the user, and user has clicked out of the fields, then beside it a username should be automatically generated which should be in the following format: [firstname]_[lastname]_[random integer]
 * First name and last name should be lowercased, and then a random integer between 1 and 9 should be added to the end
 * For example: if the inputs are "John" and "DOE" the generated username could be "john_doe_4" or "john_doe_2"
 */
import {
  Component,
  ElementRef,
  NgModule,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ng-app',
  template: `
    <h2>Enter your first and last name</h2>
    <form>
      <input
        type="firstname"
        placeholder="Your first name"
        value=""
        name="firstname"
        #firstnameValue
      />
      <input
        type="lastname"
        placeholder="Your last name"
        value=""
        name="lastname"
        #lastnameValue
      />
    </form>
    <h3>{{ result }}</h3>
  `,
  styles: [],
})
export class UserNameComponent {
  @ViewChild('firstnameValue') firstnameValue: ElementRef;
  @ViewChild('lastnameValue') lastnameValue: ElementRef;

  firstName: string = '';
  lastName: string = '';
  result: string = '';
  constructor(renderer: Renderer2) {
    renderer.listen('window', 'click', (e: Event) => {
      if (
        e.target !== this.firstnameValue.nativeElement &&
        e.target !== this.lastnameValue.nativeElement
      ) {
        this.result = `${this.firstnameValue.nativeElement.value.toLowerCase()}_${this.lastnameValue.nativeElement.value.toLowerCase()}_${Math.floor(
          Math.random() * 9
        )}`;
      }
    });
  }
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserNameComponent,
      },
    ]),
  ],
  declarations: [UserNameComponent],
})
export class UserNameModule {}
