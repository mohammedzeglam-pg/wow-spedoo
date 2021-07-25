import {
  MaxLength,
  MinLength,
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsOptional,
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
  @IsOptional()
  username?: string;
  @IsString()
  @IsOptional()
  firstname?: string;
  @IsString()
  @IsOptional()
  lastname?: string;
  @IsPhoneNumber('LY', {
    message: ValidationMessage.password,
  })
  @IsOptional()
  phone?: string;
  @IsEmail(
    {},
    {
      message: ValidationMessage.email,
    },
  )
  @IsOptional()
  email?: string;
}
