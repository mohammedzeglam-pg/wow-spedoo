import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export enum NestPickStatus {
  PICKED = 'PICKED',
  CANCELED = 'CANCELED',
}
export class UpdatePickStatusDto {
  @IsNumber()
  @Type(() => Number)
  productId: number;
  @IsEnum(NestPickStatus)
  status: NestPickStatus;
  @IsString()
  @IsOptional()
  note?: string;
}
