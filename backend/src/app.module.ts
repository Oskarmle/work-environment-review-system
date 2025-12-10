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
import { AuthModule } from './app/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { InitialCheckModule } from './app/initial-check/initial-check.module';
import {
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  AuthGuard,
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';

// FIXME: Linting issues with nest-keycloak-connect, temporarily disabled
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:8080',
      realm: process.env.KEYCLOAK_REALM,
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      secret: process.env.KEYCLOAK_SECRET || '',
    }),
    TypeOrmModule.forRoot(dbConfig),
    StationModule,
    RoleModule,
    FocusAreaModule,
    UserModule,
    ReportModule,
    SectionModule,
    SectionFieldModule,
    SectionFieldResponseModule,
    AuthModule,
    InitialCheckModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
