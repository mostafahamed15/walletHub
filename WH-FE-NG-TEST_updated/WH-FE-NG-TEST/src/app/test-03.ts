/**
 * Update the following components to meet the requirements :
 *
 * * Bind [email] property to input[name="email"]
 * * Bind [password] property to input[name="password"]
 *
 * Without using angular forms, validate both fields so that :
 * * email is in correct format ( ex: ends with @a.com)
 * * password contains at least one special character, one upper case character, one lower case character, one number and a minium of 8 characters in length
 * * The fields should be validated when trying to submit the form
 * * Prevent the form from doing an actual form submit and instead, after validation pass, turn on the [logged_in] flag
 *
 * You can add error messages below each field that shows if the field is not valid
 */
import { Component, NgModule, ViewChild, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ng-app',
  template: `<form>
    <h2>Login</h2>
    <br />
    <input type="email" value="" name="email" #emailValue />
    <br />
    <p *ngIf="emailErrorMassege !== ''" style="color:red">
      {{ emailErrorMassege }}
    </p>
    <br />
    <input type="password" value="" name="password" #passwordValue />
    <button (click)="preview($event)">Submit</button>
    <br />
    <p *ngIf="passErrorMassege !== ''" style="color:red">
      {{ passErrorMassege }}
    </p>
    <br /><br />
    <div *ngIf="logged_in">Logged In!</div>
  </form>`,
})
export class Test03Component {
  @ViewChild('emailValue') emailValue: ElementRef;
  @ViewChild('passwordValue') passwordValue: ElementRef;

  email: string = '';
  password: string = '';
  emailExp: RegExp =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  passwordExp: RegExp =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  emailErrorMassege: string = '';
  passErrorMassege: string = '';

  logged_in = false;

  validateEmail(email: string) {
    return email.match(this.emailExp);
  }

  validatePass(pass: string) {
    return pass.match(this.passwordExp);
  }
  preview(e) {
    e.preventDefault();
    this.email = this.emailValue.nativeElement.value;
    this.password = this.passwordValue.nativeElement.value;
    if (this.validateEmail(this.email) && this.validatePass(this.password)) {
      this.logged_in = true;
      (this.emailErrorMassege = ''), (this.passErrorMassege = '');
    } else {
      if (!this.validateEmail(this.email)) {
        this.emailErrorMassege = 'Invalid mail!!';
        this.logged_in = false;
      }
      if (!this.validatePass(this.password)) {
        this.passErrorMassege =
          'password contains at least one special character, one upper case character, one lower case character, one number and a minium of 8 characters in length!!';
        this.logged_in = false;
      }
    }
  }
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: Test03Component,
      },
    ]),
  ],
  declarations: [Test03Component],
})
export class Test03Module {}
