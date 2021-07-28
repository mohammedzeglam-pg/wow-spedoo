import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const NestPartnerDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest();
    const { partner } = user;
    return partner.id;
  },
);
