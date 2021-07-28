import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class NestPaymentMethodDto {
  @IsOptional()
  @Type(() => Number)
  id: number;
  @IsOptional()
  @IsString()
  name: string;
}
