import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { SectionFieldResponseService } from './section-field-response.service';
import { CreateSectionFieldResponseDto } from './dto/create-section-field-response.dto';

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
}
