import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const DeliveryBoyDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest();
    const { delivery_boy } = user;
    return delivery_boy.id;
  },
);