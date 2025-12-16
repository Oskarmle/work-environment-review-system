// FIXME: Disable linting rules for usage of any type due to dynamic import of ES module

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';

@Injectable()
export class KeycloakService {
  private kcAdminClient: any;

  async onModuleInit() {
    const { default: KcAdminClient } = await import(
      '@keycloak/keycloak-admin-client'
    );

    this.kcAdminClient = new KcAdminClient({
      baseUrl: process.env.KEYCLOAK_BASE_URL,
      realmName: 'master',
    });

    await this.kcAdminClient.auth({
      username: process.env.KEYCLOAK_ADMIN_USERNAME,
      password: process.env.KEYCLOAK_ADMIN_PASSWORD,
      grantType: 'password',
      clientId: 'admin-cli',
    });

    this.kcAdminClient.setConfig({
      realmName: process.env.KEYCLOAK_REALM,
    });
  }

  private async ensureAuthenticated() {
    this.kcAdminClient.setConfig({
      realmName: 'master',
    });

    await this.kcAdminClient.auth({
      username: process.env.KEYCLOAK_ADMIN_USERNAME,
      password: process.env.KEYCLOAK_ADMIN_PASSWORD,
      grantType: 'password',
      clientId: 'admin-cli',
    });

    this.kcAdminClient.setConfig({
      realmName: process.env.KEYCLOAK_REALM,
    });
  }

  async getUsers() {
    await this.ensureAuthenticated();
    return await this.kcAdminClient.users.find();
  }
}
