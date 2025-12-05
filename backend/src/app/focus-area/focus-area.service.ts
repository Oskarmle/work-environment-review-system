import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FocusArea } from './entities/focus-area.entity';
import { Repository } from 'typeorm';
import { CreateFocusAreaDto } from './dto/focus-area.dto';

@Injectable()
export class FocusAreaService {
  constructor(
    @InjectRepository(FocusArea)
    private focusAreaRepository: Repository<FocusArea>,
  ) {}

  async create(createFocusAreaDto: CreateFocusAreaDto): Promise<FocusArea> {
    const focusArea = this.focusAreaRepository.create(createFocusAreaDto);

    if (createFocusAreaDto.isActive === true) {
      await this.focusAreaRepository.update(
        { isActive: true },
        { isActive: false },
      );
    }
    return this.focusAreaRepository.save(focusArea);
  }

  async findActiveOne(): Promise<FocusArea | null> {
    return this.focusAreaRepository.findOneBy({ isActive: true });
  }

  async findAll(): Promise<FocusArea[]> {
    return this.focusAreaRepository.find();
  }

  async activeFocusArea(id: string): Promise<FocusArea | null> {
    await this.focusAreaRepository.update(
      { isActive: true },
      { isActive: false },
    );
    await this.focusAreaRepository.update(id, { isActive: true });
    return this.focusAreaRepository.findOneBy({ id });
  }
}
