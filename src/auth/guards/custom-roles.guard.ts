import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class CustomRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const graphqlContext = GqlExecutionContext.create(context);
    const roles: string[] = this.reflector.getAllAndMerge<string[]>('Roles', [
      graphqlContext.getHandler(),
      graphqlContext.getClass(),
    ]);
    const currentUserRole = graphqlContext.getContext().req.user.role;
    if (currentUserRole === 'SuperUser') return true;
    const isRoleExists = roles.find((value) => value === currentUserRole);
    return isRoleExists ? true : false;
  }
}
