import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ApiKeyAuthGuard } from '../api-key-auth.guard';

export const ApiKeyDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const { authorization } = ctx.switchToHttp().getRequest().headers;
    const tokens = authorization.toLowerCase().split(' ');
    return ApiKeyAuthGuard.getKey(tokens);
  },
);
