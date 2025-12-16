// FIXME: Disable linting rules for usage of any type due to dynamic import of ES module

/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Get } from '@nestjs/common';
import { KeycloakService } from './keycloak.service';

@Controller('keycloak')
export class KeycloakController {
  constructor(private keycloakService: KeycloakService) {}

  @Get('users')
  async getUsers() {
    return this.keycloakService.getUsers();
  }
}
