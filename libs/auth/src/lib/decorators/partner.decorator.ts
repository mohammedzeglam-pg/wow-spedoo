import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const PartnerDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest();
    const { partner } = user;
    return partner.id;
  },
);
