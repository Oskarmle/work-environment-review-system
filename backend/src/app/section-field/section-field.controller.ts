import { Body, Controller, Get, Post } from '@nestjs/common';
import { SectionFieldService } from './section-field.service';
import { CreateSectionFieldDto } from './dto/section-field.dto';
import { SectionField } from './entities/section-field.entity';

@Controller('section-field')
export class SectionFieldController {
  constructor(private sectionFieldService: SectionFieldService) {}

  @Post()
  async create(
    @Body() createSectionFieldDto: CreateSectionFieldDto,
  ): Promise<SectionField> {
    return this.sectionFieldService.create(createSectionFieldDto);
  }

  @Get()
  async findAll(): Promise<SectionField[]> {
    return this.sectionFieldService.findAll();
  }
}
