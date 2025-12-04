import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Station } from './entities/station.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateStationDto } from './dto/create-station.dto';

@Injectable()
export class StationService {
  constructor(
    @InjectRepository(Station)
    private stationRepository: Repository<Station>,
  ) {}

  async create(createStationDto: CreateStationDto): Promise<Station> {
    const station = this.stationRepository.create(createStationDto);
    return this.stationRepository.save(station);
  }

  findOne(options: FindOneOptions<Station>): Promise<Station | null> {
    return this.stationRepository.findOne(options);
  }

  findAll(): Promise<Station[]> {
    return this.stationRepository.find();
  }
}
