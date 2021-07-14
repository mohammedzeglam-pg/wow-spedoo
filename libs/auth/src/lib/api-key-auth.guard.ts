import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '@wow-spedoo/prisma';


@Injectable()
export class ApiKeyAuthGuard implements CanActivate{
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma:PrismaService
  ) { }
  private readonly logger = new Logger(ApiKeyAuthGuard.name);
  async canActivate(context: ExecutionContext):Promise<boolean>   {
    const header =context.switchToHttp().getRequest().headers;
    const {token} = header;
    const userId = await this.validate(token);
    return !!userId;

  }

  async validate(token:string){
    try {
      return  this.prisma.partner.findUnique({
        select: {
          id:true
        },
        where: {
          token: token,
        },
        rejectOnNotFound:true,
      });
    }catch(err){
      this.logger.error(err);
      throw new UnauthorizedException();
    }
  }
}
