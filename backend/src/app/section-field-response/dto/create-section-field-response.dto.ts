import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSectionFieldResponseDto {
  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsBoolean()
  isNotRelevant?: boolean;

  @IsOptional()
  @IsBoolean()
  isOkay?: boolean;

  @IsNotEmpty()
  @IsString()
  sectionFieldId: string;

  @IsNotEmpty()
  @IsString()
  reportId: string;
}
