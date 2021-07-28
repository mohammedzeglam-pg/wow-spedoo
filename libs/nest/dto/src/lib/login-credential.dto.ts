import {
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ValidationMessage } from './validation-message';
export class LoginCredential {
  @IsPhoneNumber('LY', {
    message: ValidationMessage.phone,
  })
  phone: string;

  @IsString()
  @MinLength(8, {
    message: ValidationMessage.minLength,
  })
  @MaxLength(32, {
    message: ValidationMessage.minLength,
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: ValidationMessage.password,
  })
  password: string;
}
