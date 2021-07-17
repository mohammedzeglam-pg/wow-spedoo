import { createParamDecorator, ExecutionContext  } from '@nestjs/common';

export const PickBoyDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
      const { user } = ctx.switchToHttp().getRequest();
      const { pick } = user;
      return pick.id;
  },
);
