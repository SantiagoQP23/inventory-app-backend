import {
  SetMetadata,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const ACCESS_KEY = 'access';

/**
 * Decorator to set required roles for an endpoint.
 * Usage: @Access('ADMIN', 'MANAGER')
 */
export const Access = (...roles: string[]) => SetMetadata(ACCESS_KEY, roles);

/**
 * Param decorator to get current user from request
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
