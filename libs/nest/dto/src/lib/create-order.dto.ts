import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateManyProductDto } from './create-many-product.dto';
import { NestPaymentMethodDto } from './payment-method.dto';
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
  @IsString()
  @IsNotEmpty()
  recipient: string;
  @IsNumber()
  @Type(() => Number)
  total_price: number;
  @IsObject()
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => NestPaymentMethodDto)
  payment_method: NestPaymentMethodDto;
  @IsNumber()
  @Type(() => Number)
  lat: number;
  @IsNumber()
  @Type(() => Number)
  lon: number;
  @IsPhoneNumber('LY', {
    message: ValidationMessage.phone,
  })
  phone: string;
}
