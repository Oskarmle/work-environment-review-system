import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { InitialCheckService } from './initial-check.service';
import { CreateInitialCheckDto } from './dto/create-initial-check.dto';
import { Roles } from 'nest-keycloak-connect';

@Controller('initial-check')
export class InitialCheckController {
  constructor(private initialCheckService: InitialCheckService) {}

  @Roles({ roles: ['manager'] })
  @Post()
  async create(@Body() createInitialCheckDto: CreateInitialCheckDto) {
    return await this.initialCheckService.create(createInitialCheckDto);
  }

  @Get()
  async findAll() {
    return await this.initialCheckService.findAll();
  }

  @Roles({ roles: ['manager'] })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.initialCheckService.remove(id);
  }
}
