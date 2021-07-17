import { IsNotEmpty, IsString } from 'class-validator';

export class AddCityDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
