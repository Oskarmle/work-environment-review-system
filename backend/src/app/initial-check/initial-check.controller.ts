import { Body, Controller, Post } from '@nestjs/common';
import { InitialCheckService } from './initial-check.service';
import { CreateInitialCheckDto } from './dto/create-initial-check.dto';

@Controller('initial-check')
export class InitialCheckController {
  constructor(private initialCheckService: InitialCheckService) {}

  @Post()
  async create(@Body() createInitialCheckDto: CreateInitialCheckDto) {
    return await this.initialCheckService.create(createInitialCheckDto);
  }
}
