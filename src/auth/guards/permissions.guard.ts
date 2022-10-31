import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requireRoles = this.reflector.getAllAndOverride<string[]>(
      'permissions',
      [context.getHandler(), context.getClass()],
    );

    if (!requireRoles) {
      return true;
    }

    const userPermissions = context.getArgs()[0].user.permissions;
    const hasPermission = () =>
      requireRoles.every((el) => userPermissions.includes(el));

    return hasPermission();
  }
}
