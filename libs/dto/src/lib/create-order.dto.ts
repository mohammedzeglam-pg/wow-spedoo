import {
  IsArray,
  IsDefined,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsPhoneNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateManyProductDto } from './create-many-product.dto';
import { PaymentMethodDto } from './payment-method.dto';
import { ValidationMessage } from './validation-message';

export class CreateOrderDto {
  @IsNumber()
  @Type(() => Number)
  order_id: number;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateManyProductDto)
  products: CreateManyProductDto[];
  @IsNumber()
  @Type(() => Number)
  total_pieces: number;
  recipient: string;
  @IsNumber()
  @Type(() => Number)
  total_price: number;
  @IsObject()
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => PaymentMethodDto)
  payment_method: PaymentMethodDto;
  @IsNumber()
  @Type(() => Number)
  lat: number;
  @IsNumber()
  @Type(() => Number)
  lon: number;
  //TODO:FIX ME
  @IsPhoneNumber('LY', {
    message: ValidationMessage.password,
  })
  phone: string;
}
