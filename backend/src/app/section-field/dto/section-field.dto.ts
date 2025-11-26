import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSectionFieldDto {
  @IsNotEmpty()
  @IsString()
  whatToCheck: string;

  @IsNotEmpty()
  @IsString()
  @IsBoolean()
  lawInspection: boolean;

  @IsNotEmpty()
  @IsBoolean()
  internalControl: boolean;

  @IsOptional()
  @IsString()
  howToCheck: string;

  @IsString()
  @IsOptional()
  responsibility: string;

  @IsNotEmpty()
  @IsString()
  sectionId: string;
}
