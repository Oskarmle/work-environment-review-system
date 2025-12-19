import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SectionFieldResponse } from './entities/section-field-response.entity';
import { Repository } from 'typeorm';
import { CreateSectionFieldResponseDto } from './dto/create-section-field-response.dto';

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
    const insertValues = createSectionFieldResponseDtos.map((dto, index) => {
      const { sectionFieldId, reportId, comment, isNotRelevant, isOkay } = dto;

      const file = files?.[index];

      const value = {
        comment: comment || '',
        isNotRelevant: isNotRelevant ?? false,
        isOkay: isOkay ?? false,
        sectionField: { id: sectionFieldId },
        report: { id: reportId },
        ...(file && {
          imageData: file.buffer,
          imageMimeType: file.mimetype,
          imageFileName: file.originalname,
          imageSize: file.size,
        }),
      };

      return value;
    });

    const result = await this.sectionFieldResponseRepository
      .createQueryBuilder()
      .insert()
      .into(SectionFieldResponse)
      .values(insertValues)
      .returning('*')
      .execute();

    return result.raw as SectionFieldResponse[];
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
