import { Body, Controller, Post } from '@nestjs/common';
import { SectionFieldResponseService } from './section-field-response.service';
import { CreateSectionFieldResponseDto } from './dto/create-section-field-response.dto';

@Controller('section-field-response')
export class SectionFieldResponseController {
  constructor(
    private readonly sectionFieldResponseService: SectionFieldResponseService,
  ) {}

  @Post()
  create(
    @Body() createSectionFieldResponseDtos: CreateSectionFieldResponseDto[],
  ) {
    return this.sectionFieldResponseService.createMany(
      createSectionFieldResponseDtos,
    );
  }
}
