import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '@wow-spedoo/prisma';


@Injectable()
export class ApiKeyAuthGuard implements CanActivate{
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma:PrismaService
  ) {
  }
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
          api_key: token,
        },
        rejectOnNotFound:false,
      });
    }catch(err){
      Logger.warn(err);
      throw new UnauthorizedException();
    }
  }
}
