import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@wow-spedoo/prisma';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private jwtService: JwtService, private prisma: PrismaService) {}
  async login(userCredentials) {
    try {
      const { phone, password: pass } = userCredentials;
      const user = await this.prisma.user.findUnique({
        where: { phone },
        select: {
          id: true,
          email: true,
          role: true,
          password:true,
          salt:true,
          username:true,
          phone:true,
          partner:{
            select:{
              id:true,
            }
          },
          pick_boy:{
            select: {
              id:true
            }
          },
          delivery_boy:{
            select:{
              id:true
            }
          },

        },
      });

      const checkPass: boolean = await this.validatePassword(user, pass);
      if (user && checkPass) {

        const payload = { id: user.id, role: user.role,email:user.email,phone:user.phone,partner:user.partner,pick:user.pick_boy,delivery:user.delivery_boy };
        // const payload = { id: user.id, role: user.role,email:user.email,phone:user.phone,pick:user.pick_boy,delivery:user.delivery_boy };
        user['access_token'] = this.jwtService.sign(payload);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {password,role,id,salt,...rs} = user;
        return rs;
      }
      return null;
    } catch (err) {
      this.logger.error(err);
      throw new Error(err);
    }
  }

  // Validate User password because user hash
  async validatePassword(user, password: string): Promise<boolean> {
    try {
      const hash = await bcrypt.hash(password, user.salt);
      return hash === user.password;
    }catch(err){
      Logger.warn(err);
      return false;
    }
  }
}
