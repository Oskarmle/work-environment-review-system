import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SectionFieldResponse } from './entities/section-field-response.entity';
import { Repository } from 'typeorm';
import { CreateSectionFieldResponseDto } from './dto/create-section-field-response.dto';

@Injectable()
export class SectionFieldResponseService {
  constructor(
    @InjectRepository(SectionFieldResponse)
    private sectionFieldResponseRepository: Repository<SectionFieldResponse>,
  ) {}

  async create(
    createSectionFieldResponseDto: CreateSectionFieldResponseDto,
  ): Promise<SectionFieldResponse> {
    const { sectionFieldId, reportId, ...sectionFieldResponseData } =
      createSectionFieldResponseDto;

    const sectionFieldResponse = this.sectionFieldResponseRepository.create({
      ...sectionFieldResponseData,
      sectionField: { id: sectionFieldId },
      report: { id: reportId },
    });

    return this.sectionFieldResponseRepository.save(sectionFieldResponse);
  }

  async createMany(
    createSectionFieldResponseDtos: CreateSectionFieldResponseDto[],
  ): Promise<SectionFieldResponse[]> {
    const sectionFieldResponses = createSectionFieldResponseDtos.map((dto) => {
      const { sectionFieldId, reportId, ...sectionFieldResponseData } = dto;
      return this.sectionFieldResponseRepository.create({
        ...sectionFieldResponseData,
        sectionField: { id: sectionFieldId },
        report: { id: reportId },
      });
    });

    return this.sectionFieldResponseRepository.save(sectionFieldResponses);
  }
}
