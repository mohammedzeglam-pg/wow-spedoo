import { UserService } from './user.service';
import { Body, Controller, Get, Logger, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateUserCredential, LoginCredential, UpdateUserCredential } from '@wow-spedoo/dto';
import {UserSelect} from 'prisma';
import { PaginationDto } from '@wow-spedoo/dto';
import { Roles } from '@wow-spedoo/auth';
import { Role } from '@wow-spedoo/auth';
import { JwtAuthGuard } from '@wow-spedoo/auth';
import { RolesGuard } from '@wow-spedoo/auth';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Post('create')
  async createNewUser(@Body() createUserCredential:CreateUserCredential):Promise<UserSelect|void>{
    return await this.userService.createUser(createUserCredential);
  }



  @Post('login')
   login(@Body() loginCredential:LoginCredential){
    return  this.userService.login(loginCredential);
  }

  //create dto for chaeck id with limit
  @Patch("update/:id")
  async updateUser(@Param() param,@Body() updateUser:UpdateUserCredential){
    try{
      const id = parseInt(param.id);
      if(!id){
        throw new Error('Not a Number');
      }else {
        return await this.userService.updateUser(id, updateUser);
      }
    }catch(err){
      Logger.log(err);
    }
  }


  @Get('partner')
  async getPartners(@Query() query:PaginationDto){
    const {take,skip} = query;
    return await this.userService.getPartners(take,skip);
  }

  @Get('pick-boy')
  async getPickBoy(@Query() query:PaginationDto){
    const {take,skip} = query;
    return await this.userService.getPickBoy(take,skip);
  }

  @Get('delivery-boy')
  async getDeliveryBoy(@Query() query:PaginationDto){
    const {take,skip} = query;
    return await this.userService.getPickBoy(take,skip);
  }

}
