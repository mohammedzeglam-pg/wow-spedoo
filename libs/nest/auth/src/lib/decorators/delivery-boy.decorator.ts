import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const NestDeliveryBoyDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest();
    const { delivery } = user;
    return delivery.id;
  },
);
