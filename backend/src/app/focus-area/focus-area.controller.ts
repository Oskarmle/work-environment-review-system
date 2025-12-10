import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { FocusAreaService } from './focus-area.service';
import { CreateFocusAreaDto } from './dto/focus-area.dto';
import { FocusArea } from './entities/focus-area.entity';

@Controller('focus-area')
export class FocusAreaController {
  constructor(private focusAreaService: FocusAreaService) {}

  @Roles({ roles: ['manager'] })
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

  @Roles({ roles: ['manager'] })
  @Patch('activate')
  async activateFocusArea(@Body('id') id: string): Promise<FocusArea | null> {
    return this.focusAreaService.activeFocusArea(id);
  }

  @Roles({ roles: ['manager'] })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.focusAreaService.remove(id);
  }
}
