import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const IdentityDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest();
    const id = user.delivery?.id || user.pick?.id;
    const { role } = user;
    return { id, role };
  },
);
