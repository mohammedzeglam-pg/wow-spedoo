import {
  MaxLength,
  MinLength,
  IsString,
  IsEmail,
  Matches, IsNumber,
} from 'class-validator';
import {Role} from '@prisma/client';
export class CreateUserCredential  {
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  username: string;
  @IsString()
  firstname: string;
  @IsString()
  lastname: string;
  @MinLength(9)
  @MaxLength(10)
  @IsNumber()
  phone: number;

  set phoneNumber(phone:string){
    this.phone = parseInt(phone);
  }
  @IsEmail()
  email: string;
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;
  role: Role;
}

