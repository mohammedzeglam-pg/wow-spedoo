import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export enum NestDeliveryStatus {
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
}
export class UpdateDeliveryDto {
  @IsNumber()
  @Type(() => Number)
  orderId: number;
  @IsEnum(NestDeliveryStatus)
  status: NestDeliveryStatus;
  @IsString()
  @IsOptional()
  note: string;
}
