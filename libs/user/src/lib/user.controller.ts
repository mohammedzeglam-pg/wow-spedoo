import { UserService } from './user.service';
import { Body, Controller, Get,  Param, Patch, Post, Query, UseGuards, Delete } from '@nestjs/common';
import { CreateUserCredential, IdTransformerDto, LoginCredential, UpdateUserCredential } from '@wow-spedoo/dto';
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


  @Roles(Role.ADMIN,Role.MANAGER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Patch("update/:id")
  async updateUser(@Param() param:IdTransformerDto,@Body() updateUser:UpdateUserCredential){
    const {id} = param;
    return await this.userService.updateUser(id, updateUser);
  }


  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Delete('delete/:id')
  async deleteUser(@Param() param:IdTransformerDto){
    const {id} = param;
    return await this.userService.deleteUser(id);
  }


  @Roles(Role.ADMIN,Role.MANAGER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get('partner')
  async getPartners(@Query() query:PaginationDto){
    const {take,skip} = query;
    return await this.userService.getPartners(take,skip);
  }

  @Roles(Role.ADMIN,Role.MANAGER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get('pick-boy')
  async getPickBoy(@Query() query:PaginationDto){
    const {take,skip} = query;
    return await this.userService.getPickBoy(take,skip);
  }

  @Roles(Role.ADMIN,Role.MANAGER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get('delivery-boy')
  async getDeliveryBoy(@Query() query:PaginationDto){
    const {take,skip} = query;
    return await this.userService.getPickBoy(take,skip);
  }

}
