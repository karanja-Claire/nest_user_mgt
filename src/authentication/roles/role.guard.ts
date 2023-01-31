import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role, ROLES_KEY } from './role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
    // class which will compare the roles assigned to the current user to the actual roles required by the current route being processed.
  canActivate(context: ExecutionContext): boolean {
    // gets the role of the user trying to access the endpoint
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);    
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();    
    
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}