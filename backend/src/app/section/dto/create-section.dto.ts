import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateSectionDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsBoolean()
  isCompleted: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isRelevant: boolean;
}
