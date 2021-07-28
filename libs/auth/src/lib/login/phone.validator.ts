import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { PhoneNumberUtil } from 'google-libphonenumber';
const phoneNumberUtil = PhoneNumberUtil.getInstance();
export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let validNumber = false;
    if (
      control.value &&
      !isNaN(+control.value) &&
      control.value.length === 10
    ) {
      const phoneNumber = phoneNumberUtil.parse(control.value, 'LY');
      validNumber = phoneNumberUtil.isValidNumber(phoneNumber) ? true : false;
    }
    return validNumber ? null : { 'wrong number ': { value: control.value } };
  };
}
