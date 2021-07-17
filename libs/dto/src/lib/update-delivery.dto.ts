import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export enum DeliveryStatus {
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
}
export class UpdateDeliveryDto {
  @IsNumber()
  @Type(() => Number)
  orderId: number;
  @IsEnum(DeliveryStatus)
  status: DeliveryStatus;
  @IsString()
  @IsOptional()
  note: string;
}
