import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
export class AddPaymentDto {
  @IsString()
  @IsNotEmpty()
  name:string;
  @IsBoolean()
  is_take: boolean;
}
