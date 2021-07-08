import { Injectable } from '@nestjs/common';
import { PrismaService } from '@wow-spedoo/prisma';
import * as bcrypt from 'bcrypt';
import { LoginCredential } from './dto/login-credential.dto';
import { AuthService } from '@wow-spedoo/auth';
import {User} from '@prisma/client';
@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService
  ) {}

  async signup(user) {
    try {
      // hash password using salt techniques
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(user.password, salt);

      // modify the user object
      user.password = hashedPassword;
      user.salt = salt;

      // maybe the phone receive in string form parse it to check
      user.phone = parseInt(user.phone);

      // insert data to db
      const {password,salt:hash,role,...result} = await this.prisma.user.create({ data: user });
      return result;
    }catch(err){
      //TODO: maybe a proper way to handle exceptions
      return err;
    }
  }

  async login(user: LoginCredential) {
    return await this.authService.login(user);
  }

  async allPartner():Promise<User[]> {
    return await this.prisma.user.findMany({
      where:{
        partner:{
          isNot: null
        }
      }
    });
  }
}
