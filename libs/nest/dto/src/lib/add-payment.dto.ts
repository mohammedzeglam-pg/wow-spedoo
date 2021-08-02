import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class AddPaymentDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsBoolean()
  @Type(() => Boolean)
  take_money = false;
}

export class UpdatePaymentDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  take_money?: boolean;
}
