import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InitialCheck } from './entities/initial-check.entity';
import { CreateInitialCheckDto } from './dto/create-initial-check.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InitialCheckService {
  constructor(
    @InjectRepository(InitialCheck)
    private initialCheckRepository: Repository<InitialCheck>,
  ) {}

  async create(
    createInitialCheckDto: CreateInitialCheckDto,
  ): Promise<InitialCheck> {
    const initialCheck = this.initialCheckRepository.create(
      createInitialCheckDto,
    );
    return this.initialCheckRepository.save(initialCheck);
  }

  async findAll(): Promise<InitialCheck[]> {
    return this.initialCheckRepository.find();
  }
}
