import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SectionFieldResponse } from './entities/section-field-response.entity';
import { Repository } from 'typeorm';
import { CreateSectionFieldResponseDto } from './dto/create-section-field-response.dto';
import { SectionFieldResponseType } from 'src/types/response';

interface UploadedFile {
  buffer: Buffer;
  mimetype: string;
  originalname: string;
  size: number;
}

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

  async findAllForAReport(reportId: string): Promise<SectionFieldResponse[]> {
    return this.sectionFieldResponseRepository.find({
      where: { report: { id: reportId } },
      relations: ['sectionField'],
    });
  }

  async createMany(
    createSectionFieldResponseDtos: CreateSectionFieldResponseDto[],
    files?: UploadedFile[],
  ): Promise<SectionFieldResponse[]> {
    const entities = createSectionFieldResponseDtos.map((dto, index) => {
      const { sectionFieldId, reportId, comment, isNotRelevant, isOkay } = dto;

      const file = files?.[index];

      const entityData: SectionFieldResponseType = {
        comment: comment || '',
        isNotRelevant: isNotRelevant ?? false,
        isOkay: isOkay ?? false,
        sectionField: { id: sectionFieldId },
        report: { id: reportId },
      };

      if (file) {
        entityData.imageData = file.buffer;
        entityData.imageMimeType = file.mimetype;
        entityData.imageFileName = file.originalname;
        entityData.imageSize = file.size;
      }

      return entityData;
    });

    const result = await this.sectionFieldResponseRepository.insert(entities);

    const ids = result.identifiers.map(
      (identifier: { id: string }) => identifier.id,
    );
    return this.sectionFieldResponseRepository.find({
      where: ids.map((id: string) => ({ id })),
    });
  }

  async updateSectionFieldResponses(
    createSectionFieldResponseDtos: CreateSectionFieldResponseDto[],
    files?: UploadedFile[],
  ): Promise<SectionFieldResponse[]> {
    // First, get the reportId from the first dto (all should have the same reportId)
    const reportId = createSectionFieldResponseDtos[0]?.reportId;
    if (!reportId) {
      throw new Error('Report ID is required for upsert');
    }

    // Delete existing responses for this report
    await this.sectionFieldResponseRepository.delete({
      report: { id: reportId },
    });

    // Then create new ones
    return this.createMany(createSectionFieldResponseDtos, files);
  }
}
