import { Body, Controller, Get, Post } from '@nestjs/common';
import { StationService } from './station.service';
import { CreateStationDto } from './dto/create-station.dto';

@Controller('station')
export class StationController {
  constructor(private stationService: StationService) {}

  @Post()
  async create(@Body() createStationDto: CreateStationDto) {
    return await this.stationService.create(createStationDto);
  }

  @Get()
  async findAll() {
    return await this.stationService.findAll();
  }

  @Get(':id')
  async findOne(@Body('id') id: string) {
    return await this.stationService.findOne({ where: { id } });
  }
}
