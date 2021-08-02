import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const BodyMultipart = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const { body, headers } = ctx.switchToHttp().getRequest();
    const result = {};
    if (typeof data === 'string') {
      return body[data].value;
    } else if (typeof data === 'object') {
      for (const key in data) {
        result[key] = body[key]?.value;
      }
    } else {
      for (const param in body) {
        if (headers['content-type'] === 'application/json') {
          result[param] = body[param];
        } else {
          if (body[param]?.value) {
            result[param] = body[param]?.value;
          }
        }
      }
    }
    return result;
  },
);
