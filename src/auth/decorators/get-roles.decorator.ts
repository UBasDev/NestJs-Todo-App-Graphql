import { SetMetadata } from '@nestjs/common';

export const GetRolesDecorator = (...roles: string[]) =>
  SetMetadata('Roles', roles);
