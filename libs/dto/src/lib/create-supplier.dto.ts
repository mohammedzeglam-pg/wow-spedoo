import { IsPhoneNumber } from 'class-validator';
import { ValidationMessage } from './validation-message';
import { Type } from 'class-transformer';

export class CreateSupplierDto{
  name: string;
  @IsPhoneNumber('LY',{
    message:ValidationMessage.phone
  })
  phone: string;
  latitude?: string | null;
  longitude?: string | null;
  @Type(()=>Number || null)
  streetId: number | null;
}
