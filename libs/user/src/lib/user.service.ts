import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@wow-spedoo/prisma';
import * as bcrypt from 'bcrypt';
import { AuthService } from '@wow-spedoo/auth';
import { UserWhereInput, UserSelect, UserUpdateInput } from 'prisma';
import {Role} from '@prisma/client';
import { LoginCredential } from '@wow-spedoo/dto';
@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  //TODO: refactor code to proper interface or class interface seems perfect to angular
  private readonly UserObject: UserSelect = {
    id: true,
    username: true,
    firstname: true,
    phone: true,
    lastname: true,
    email: true,
  };

  async createUser(user):Promise<UserSelect|void> {
    try {
      // hash password using salt techniques
      const salt = await bcrypt.genSalt();
      // save encrypted password and salt
      user.password = await bcrypt.hash(user.password, salt);
      user.salt = salt;
      if(user.role === Role.DELIVERY){
        user.delivery_boy = {
          create:{
          }
        }
      } else if(user.role === Role.PICKER){
        user.pick_boy = {
          create:{
          }
        }
      }else if(user.role === Role.PARTNER){
        user.partner = {
          create:{

          }
        }
      }
      // insert data to db
      return  this.prisma.user.create({
        data: user,
        select: this.UserObject,
      });
    } catch (err) {
      Logger.log(err);
    }
  }

  login(user: LoginCredential) {
    return this.authService.login(user);
  }

  async updateUser(userId: number, data: UserUpdateInput) {
    try {
      return await this.prisma.user.update({
        select: this.UserObject,
        data: data,
        where: {
          id: userId,
        },
      });
    } catch (err) {
      Logger.log(err);
    }
  }
  async getManyPartner(take = 10, skip = 0) {
    const search: UserWhereInput = {
      partner: {
        isNot: null,
      },
    };
    return this.fetchUserData(search, take, skip);
  }

  async getManyPickBoy(take = 10, skip = 0) {
    const search: UserWhereInput = {
      pick_boy: {
        isNot: null,
      },
    };
    return this.fetchUserData(search, take, skip);
  }

  async getManyDeliveriesBoy(take = 10, skip = 0) {
    const search: UserWhereInput = {
      delivery_boy: {
        isNot: null,
      },
    };
    return this.fetchUserData(search, take, skip);
  }

  private async fetchUserData(
    search: UserWhereInput,
    take = 10,
    skip = 0,
  ): Promise<UserSelect | void> {
    try {
      return this.prisma.user.findMany({
        select: this.UserObject,
        where: search,
        take: take,
        skip: take * skip,
      });
    } catch (err) {
      Logger.log(err);
    }
  }

  async deleteUser(id: number) {
    try {
      return this.prisma.user.delete({
        select: {
          phone: true,
          username: true,
          email: true,
        },
        where: {
          id: id
        }
      });
    }catch(err){
      Logger.log(err);
    }
  }
}
