import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class AddPaymentDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsBoolean()
  take_money = false;
}

export class UpdatePaymentDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;
  @IsBoolean()
  @IsOptional()
  take_money?: boolean;
}
