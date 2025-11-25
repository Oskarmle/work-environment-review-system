import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInitialCheckDto {
  @IsNotEmpty()
  @IsString()
  checkName: string;
}
