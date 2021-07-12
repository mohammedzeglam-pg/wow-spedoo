import { IsInt } from 'class-validator';
export class CreatePartnerDto {
  @IsInt()
  userId: number;
}
