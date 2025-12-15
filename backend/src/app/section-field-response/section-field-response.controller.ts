import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { SectionFieldResponseService } from './section-field-response.service';
import { CreateSectionFieldResponseDto } from './dto/create-section-field-response.dto';
import { SectionFieldResponse } from './entities/section-field-response.entity';

@Controller('section-field-response')
export class SectionFieldResponseController {
  constructor(
    private readonly sectionFieldResponseService: SectionFieldResponseService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  create(
    @Body() body: { responses: string },
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const createSectionFieldResponseDtos = JSON.parse(
      body.responses,
    ) as CreateSectionFieldResponseDto[];

    return this.sectionFieldResponseService.createMany(
      createSectionFieldResponseDtos,
      files,
    );
  }

  @Get(':reportId')
  findAllForAReport(@Param('reportId') reportId: string) {
    return this.sectionFieldResponseService.findAllForAReport(reportId);
  }

  @Put()
  @UseInterceptors(FilesInterceptor('images'))
  upsert(
    @Body() body: { responses: string },
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<SectionFieldResponse[]> {
    const createSectionFieldResponseDtos = JSON.parse(
      body.responses,
    ) as CreateSectionFieldResponseDto[];

    return this.sectionFieldResponseService.updateSectionFieldResponses(
      createSectionFieldResponseDtos,
      files,
    );
  }
}
