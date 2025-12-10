declare module 'nest-keycloak-connect' {
  import { CustomDecorator, DynamicModule, CanActivate } from '@nestjs/common';

  export enum RoleMatchingMode {
    ALL = 'all',
    ANY = 'any',
  }

  export interface RoleDecoratorOptionsInterface {
    roles: string[];
    mode?: RoleMatchingMode;
  }

  export function Roles(
    roleMetaData: RoleDecoratorOptionsInterface,
  ): CustomDecorator<string>;

  export function Public(): CustomDecorator<string>;
  export function Resource(resource: string): CustomDecorator<string>;
  export function Scopes(...scopes: string[]): CustomDecorator<string>;

  export class AuthGuard implements CanActivate {
    canActivate(...args: any[]): boolean | Promise<boolean>;
  }

  export class ResourceGuard implements CanActivate {
    canActivate(...args: any[]): boolean | Promise<boolean>;
  }

  export class RoleGuard implements CanActivate {
    canActivate(...args: any[]): boolean | Promise<boolean>;
  }

  export interface KeycloakConnectOptions {
    authServerUrl: string;
    realm?: string;
    clientId?: string;
    secret?: string;
    [key: string]: any;
  }

  export class KeycloakConnectModule {
    static register(options: KeycloakConnectOptions): DynamicModule;
    static registerAsync(options: any): DynamicModule;
  }
}
