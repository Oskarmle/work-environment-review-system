import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SectionService } from './section.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { Section } from './entities/section.entity';

@Controller('section')
export class SectionController {
  constructor(private sectionService: SectionService) {}

  @Post()
  async create(@Body() createSectionDto: CreateSectionDto): Promise<Section> {
    return this.sectionService.create(createSectionDto);
  }

  @Get()
  async findAll(): Promise<Section[]> {
    return this.sectionService.findAll();
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.sectionService.remove(id);
  }
}
