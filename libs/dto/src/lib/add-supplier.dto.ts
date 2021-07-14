import { IsPhoneNumber, IsString } from 'class-validator';
import { ValidationMessage } from './validation-message';
import { Type } from 'class-transformer';

export class AddSupplierDto {
  @IsString()
  name: string;
  @IsPhoneNumber('LY',{
    message:ValidationMessage.phone
  })
  phone: string;
  lat?: string | null;
  lon?: string | null;
  @Type(()=>Number || null)
  streetId: number | null;
}
