import {
  MaxLength,
  MinLength,
  IsString,
  IsEmail,
  Matches,
  IsPhoneNumber,
  IsEnum,
} from 'class-validator';
import { Role } from '@prisma/client';
import { ValidationMessage } from './validation-message';
export class CreateUserCredential {
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
  @MinLength(8, {
    message: ValidationMessage.minLength,
  })
  @MaxLength(32, {
    message: ValidationMessage.minLength,
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: ValidationMessage.minLength,
  })
  password: string;
  @IsEnum(Role, {
    message: ValidationMessage.enum,
  })
  role: Role;
}
