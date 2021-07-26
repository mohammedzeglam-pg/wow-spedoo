import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const BodyMultipart = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const { body } = ctx.switchToHttp().getRequest();
    const result = {};
    if (typeof data === 'string') {
      return body[data].value;
    } else if (typeof data === 'object') {
      for (const key in data) {
        result[key] = body[key]?.value;
      }
    } else {
      for (const param in body) {
        result[param] = body[param]?.value;
      }
    }
    return result;
  },
);
