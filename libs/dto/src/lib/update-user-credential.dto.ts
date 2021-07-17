import {
  MaxLength,
  MinLength,
  IsString,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';
import { ValidationMessage } from './validation-message';
export class UpdateUserCredential {
  @IsString()
  @MinLength(6, {
    message: ValidationMessage.minLength,
  })
  @MaxLength(20, {
    message: ValidationMessage.maxLength,
  })
  username: string;
  @IsString()
  firstname: string;
  @IsString()
  lastname: string;
  @IsPhoneNumber('LY', {
    message: ValidationMessage.password,
  })
  phone: string;
  @IsEmail(
    {},
    {
      message: ValidationMessage.email,
    },
  )
  email: string;
}
