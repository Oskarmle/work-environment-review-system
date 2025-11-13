import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { dbConfig } from './database/data-source';
import { StationModule } from './app/station/station.module';
import { RoleModule } from './app/role/role.module';
import { FocusAreaModule } from './app/focus-area/focus-area.module';
import { UserModule } from './app/user/user.module';
import { ReportModule } from './app/report/report.module';
import { SectionModule } from './app/section/section.module';
import { SectionFieldModule } from './app/section-field/section-field.module';
import { SectionFieldResponseModule } from './app/section-field-response/section-field-response.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    StationModule,
    RoleModule,
    FocusAreaModule,
    UserModule,
    ReportModule,
    SectionModule,
    SectionFieldModule,
    SectionFieldResponseModule,
  ],
})
export class AppModule {}
