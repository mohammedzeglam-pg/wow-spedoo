import {
  MaxLength,
  MinLength,
  IsString,
  IsEmail,
  Matches,
} from 'class-validator';
export class CreateUserCredential {
  id?: string;
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  username: string;
  @IsString()
  firstname: string;
  lastname: string;
  @MinLength(9)
  @MaxLength(10)
  phone: number;
  @IsEmail()
  email: string;
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;
  role: OrderStatus;
}

enum OrderStatus {
  UNDER_REVIEW,
  PICKING,
  FILTERATION,
  DELIVERING,
  COMPLETED,
  CANCELED,
}
