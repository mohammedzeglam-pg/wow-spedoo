import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export enum PickStatus {
  PICKED = 'PICKED',
  CANCELED = 'CANCELED',
}
export class UpdatePickStatusDto {
  @IsNumber()
  @Type(() => Number)
  productId: number;
  @IsEnum(PickStatus)
  status: PickStatus;
  @IsString()
  @IsOptional()
  note?: string;
}
