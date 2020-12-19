import { FormControl, ValidationErrors } from '@angular/forms';

export function futureDateValidator(control: FormControl): ValidationErrors {
  let currentdate: any;
  currentdate = new Date();
  let dateEntered = new Date(control.value);
  return currentdate < dateEntered ? null : { 'futureDate': true };
}

export function emailValidator(control: FormControl): ValidationErrors {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(control.value).toLowerCase()) ? null : { 'email': true };
}

export function minlengthValidationMessage(err, field) {
  return `Should have atleast ${field.templateOptions.minLength} characters`;
}

export function maxlengthValidationMessage(err, field) {
  return `This value should be less than ${field.templateOptions.maxLength} characters`;
}

export function minValidationMessage(err, field) {
  return `This value should be more than ${field.templateOptions.min}`;
}

export function maxValidationMessage(err, field) {
  return `This value should be less than ${field.templateOptions.max}`;
}