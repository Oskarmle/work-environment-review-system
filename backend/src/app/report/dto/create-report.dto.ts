import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateReportDto {
  @IsOptional()
  @IsString()
  comment: string;

  @IsBoolean()
  @IsNotEmpty()
  IsCompleted: boolean;

  @IsDate()
  @IsNotEmpty()
  reportBeganAt: Date;

  @IsNotEmpty()
  @IsString()
  focusAreaId: string;

  @IsNotEmpty()
  @IsString()
  stationId: string;
}
