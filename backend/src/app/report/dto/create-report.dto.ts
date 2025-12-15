import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateReportDto {
  @IsOptional()
  @IsString()
  comment: string;

  @IsBoolean()
  @IsNotEmpty()
  IsCompleted: boolean;

  @IsNotEmpty()
  @IsString()
  focusAreaId: string;

  @IsNotEmpty()
  @IsString()
  stationId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
