import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SectionField } from './entities/section-field.entity';
import { Repository } from 'typeorm';
import { CreateSectionFieldDto } from './dto/section-field.dto';

@Injectable()
export class SectionFieldService {
  constructor(
    @InjectRepository(SectionField)
    private sectionFieldRepository: Repository<SectionField>,
  ) {}

  async create(
    createSectionFieldDto: CreateSectionFieldDto,
  ): Promise<SectionField> {
    const { sectionId, ...sectionFieldData } = createSectionFieldDto;

    const sectionField = this.sectionFieldRepository.create({
      ...sectionFieldData,
      section: { id: sectionId },
    });

    return this.sectionFieldRepository.save(sectionField);
  }

  async findAll(): Promise<SectionField[]> {
    return this.sectionFieldRepository.find({ relations: ['section'] });
  }
}
