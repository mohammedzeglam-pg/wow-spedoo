import { Component} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AsYouTypeFormatter } from 'google-libphonenumber';
import { phoneNumberValidator } from '../phone-number.validator';

@Component({
  selector: 'wow-spedoo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = this.fb.group(
    {
      phone:['',[phoneNumberValidator(),Validators.required]],
      password:['',[Validators.required]]
    }
  );

  constructor(private readonly fb:FormBuilder) { }


  asYouType() {
    const phone = this.loginForm.get('phone')?.value;
    if(phone.substring(0,3)==='218'){
      this.loginForm.controls['phone'].setValue('');
    }else{
      const digit = phone.substring(0,10);
      const formatter = new AsYouTypeFormatter('LY').inputDigit(digit);
      this.loginForm.controls['phone'].setValue(formatter);
    }
  }

  onLogin():void {
    console.log('hello');
    console.log(this.loginForm.value);
  }
}
