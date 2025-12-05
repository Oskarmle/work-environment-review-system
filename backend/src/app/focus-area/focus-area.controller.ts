import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { FocusAreaService } from './focus-area.service';
import { CreateFocusAreaDto } from './dto/focus-area.dto';
import { FocusArea } from './entities/focus-area.entity';

@Controller('focus-area')
export class FocusAreaController {
  constructor(private focusAreaService: FocusAreaService) {}

  @Post()
  async create(
    @Body() createFocusAreaDto: CreateFocusAreaDto,
  ): Promise<FocusArea> {
    return this.focusAreaService.create(createFocusAreaDto);
  }

  @Get()
  async findAll(): Promise<FocusArea[]> {
    return this.focusAreaService.findAll();
  }

  @Get('active')
  async findActiveOne(): Promise<FocusArea | null> {
    return this.focusAreaService.findActiveOne();
  }

  @Patch('activate')
  async activateFocusArea(@Body('id') id: string): Promise<FocusArea | null> {
    return this.focusAreaService.activeFocusArea(id);
  }
}
