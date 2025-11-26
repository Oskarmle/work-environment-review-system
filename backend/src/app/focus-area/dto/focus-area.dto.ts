import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFocusAreaDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
