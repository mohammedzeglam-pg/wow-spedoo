import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class PaymentMethodDto{
  @IsOptional()
  @Type(()=>Number)
  id:number;
  @IsOptional()
  @IsString()
  name:string;
}
