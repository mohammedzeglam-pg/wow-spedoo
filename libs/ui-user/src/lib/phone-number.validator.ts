import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import { PhoneNumberUtil} from 'google-libphonenumber';
const phoneNumberUtil = PhoneNumberUtil.getInstance();
export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let validNumber = false;
    try {
      const phoneNumber = phoneNumberUtil.parse(
        control.value, 'LY'
      );
      validNumber = phoneNumberUtil.isValidNumber(phoneNumber);
    }catch (e){
    }
    return validNumber?null:{'wrong number ':{value: control.value}};
  };
}
