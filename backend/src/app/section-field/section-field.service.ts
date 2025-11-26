import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SectionField } from './entities/section-field.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SectionFieldService {
  constructor(
    @InjectRepository(SectionField)
    private sectionFieldRepository: Repository<SectionField>,
  ) {}

  async create(sectionFieldData: Partial<SectionField>): Promise<SectionField> {
    const sectionField = this.sectionFieldRepository.create(sectionFieldData);
    return this.sectionFieldRepository.save(sectionField);
  }

  async findAll(): Promise<SectionField[]> {
    return this.sectionFieldRepository.find();
  }
}
