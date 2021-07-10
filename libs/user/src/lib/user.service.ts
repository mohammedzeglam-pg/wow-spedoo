import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@wow-spedoo/prisma';
import * as bcrypt from 'bcrypt';
import { LoginCredential } from './dto/login-credential.dto';
import { AuthService } from '@wow-spedoo/auth';
import {UserWhereInput,UserSelect,UserUpdateInput} from 'prisma';
@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService
  ) {}

  //TODO: get it as Interface or proper way with message interface
  private UserObject:UserSelect = {
    id:true,
    username:true,
    firstname:true,
    phone:true,
    lastname:true,
    email:true,
  };

  async createUser(user) {
    try {
      // hash password using salt techniques
      const salt = await bcrypt.genSalt();
      // save encrypted password and salt
      user.password = await bcrypt.hash(user.password, salt);
      user.salt = salt;

      // maybe the phone receive in string form parse it to check
      user.phone = parseInt(user.phone);

      // insert data to db
      return await this.prisma.user.create({
        data: user,
        select:this.UserObject,
      });
    }catch(err){
      Logger.log(err);
    }
  }


  async login(user: LoginCredential) {
    return await this.authService.login(user);
  }

  async updateUser(userId:number,data:UserUpdateInput){
    try{
      return await this.prisma.user.update({
        select:this.UserObject,
        data:data,
        where:{
          id:userId,
        }
      });
    }catch(err){
      Logger.log(err);
    }

  }
  async getPartners(take=10,skip=0) {
    const search:UserWhereInput = {
      partner:{
        isNot: null
      }
    };
    return this.fetchUserData(search,take,skip);
  }

  async getPickBoy(take=10,skip=0){
    const search:UserWhereInput = {
      pick_boy:{
        isNot: null
      }
    }
    return this.fetchUserData(search,take,skip);
  }


  async getDeliveriesBoy(take=10,skip=0){
    const search:UserWhereInput =  {
      delivery_boy:{
        isNot: null
      }
    };
    return this.fetchUserData(search,take,skip);
  }

  private async fetchUserData(search:UserWhereInput,take=10,skip=0):Promise<UserSelect|void>{
    try{
      return await this.prisma.user.findMany({
        select:this.UserObject,
        where:search,
        take:take,
        skip:take*skip,
      });
    }catch(err){
      Logger.log(err);
    }
  }
}
