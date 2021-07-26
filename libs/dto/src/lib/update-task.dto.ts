import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum TaskStatus {
  PICKED = 'PICKED',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
}
export class UpdateTaskDto {
  @Transform((obj) => obj.value?.toString().toUpperCase())
  @IsEnum(TaskStatus)
  status: TaskStatus;
  @IsOptional()
  @IsString()
  note?: string;
}
