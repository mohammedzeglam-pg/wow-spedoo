import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class AddPaymentDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsBoolean()
  is_take = false;
}

export class UpdatePaymentDto{

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;
  @IsBoolean()
  @IsOptional()
  is_take?:boolean;
}
