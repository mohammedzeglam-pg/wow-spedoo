import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '@wow-spedoo/prisma';

@Injectable()
export class ApiKeyAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}
  private readonly logger = new Logger(ApiKeyAuthGuard.name);

  static readonly auth = 'api-key';
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { authorization } = context.switchToHttp().getRequest().headers;
    if(!authorization){
      throw new UnauthorizedException();
    }
    const tokens = authorization.toLowerCase().split(' ');
    const key = ApiKeyAuthGuard.getKey(tokens);
    const userId = await this.validate(key);
    return !!userId;
  }

  async validate(token: string) {
    try {
      return this.prisma.partner.findUnique({
        select: {
          id: true,
        },
        where: {
          token: token,
        },
        rejectOnNotFound: true,
      });
    } catch (err) {
      this.logger.error(err);
      throw new UnauthorizedException();
    }
  }

  // static because it is a pure function that can i share with multiple instance
  // search about pure function and side effect
  static getKey(tokens: string[]) {
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].includes(ApiKeyAuthGuard.auth)) {
        return tokens[i + 1];
      }
    }
  }
}
