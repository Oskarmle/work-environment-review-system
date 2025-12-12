import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { dbConfig } from './database/data-source';
import { StationModule } from './app/station/station.module';
import { FocusAreaModule } from './app/focus-area/focus-area.module';
import { UserModule } from './app/user/user.module';
import { ReportModule } from './app/report/report.module';
import { SectionModule } from './app/section/section.module';
import { SectionFieldModule } from './app/section-field/section-field.module';
import { SectionFieldResponseModule } from './app/section-field-response/section-field-response.module';
import { ConfigModule } from '@nestjs/config';
import { InitialCheckModule } from './app/initial-check/initial-check.module';
import {
  KeycloakConnectModule,
  RoleGuard,
  AuthGuard,
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:8080',
      realm: process.env.KEYCLOAK_REALM,
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      secret: process.env.KEYCLOAK_SECRET || '',
      policyEnforcement: 'permissive',
      tokenValidation: 'online',
      useNestLogger: true,
    }),
    TypeOrmModule.forRoot(dbConfig),
    StationModule,
    FocusAreaModule,
    UserModule,
    ReportModule,
    SectionModule,
    SectionFieldModule,
    SectionFieldResponseModule,
    InitialCheckModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
