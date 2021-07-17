import { IsNumber, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { ValidationMessage } from './validation-message';
import { Type } from 'class-transformer';

export class AddSupplierDto {
  @IsString()
  name: string;
  @IsPhoneNumber('LY', {
    message: ValidationMessage.phone,
  })
  phone: string;
  @IsNumber()
  @Type(()=>Number)
  lat: number;
  @IsNumber()
  @Type(()=>Number)
  lon: number;
}

export class UpdateSupplierDto{
  @IsString()
  @IsOptional()
  name?: string;
  @IsPhoneNumber('LY', {
    message: ValidationMessage.phone,
  })
  @IsOptional()
  phone?: string;
  @IsNumber()
  @Type(()=>Number)
  @IsOptional()
  lat?: number;
  @IsNumber()
  @Type(()=>Number)
  @IsOptional()
  lon?: number;
}
