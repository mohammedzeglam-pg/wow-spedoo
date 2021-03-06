import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const NestPickBoyDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest();
    const { pick } = user;
    return pick.id;
  },
);
