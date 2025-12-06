import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { InitialCheckService } from './initial-check.service';
import { CreateInitialCheckDto } from './dto/create-initial-check.dto';

@Controller('initial-check')
export class InitialCheckController {
  constructor(private initialCheckService: InitialCheckService) {}

  @Post()
  async create(@Body() createInitialCheckDto: CreateInitialCheckDto) {
    return await this.initialCheckService.create(createInitialCheckDto);
  }

  @Get()
  async findAll() {
    return await this.initialCheckService.findAll();
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.initialCheckService.remove(id);
  }
}
