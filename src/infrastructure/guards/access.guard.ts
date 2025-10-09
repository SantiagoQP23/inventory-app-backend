import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ACCESS_KEY } from '../decorators/access.decorator';
import { User } from 'src/modules/users/domain/entities/user.entity';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ACCESS_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If no roles are required, allow access
    if (!requiredRoles || requiredRoles.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user as User;
    console.log('User from request:', user);
    console.log(request.rawHeaders);

    if (!user || !user.userStores)
      throw new ForbiddenException('User has no store roles');

    const hasRole = user.userStores.some((us: any) =>
      requiredRoles.includes(us.role),
    );

    if (!hasRole)
      throw new ForbiddenException('User does not have required role');

    return true;
  }
}
