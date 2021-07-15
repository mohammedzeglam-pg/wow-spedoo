import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  Delete,
  Logger,
  HttpException, HttpStatus,
} from '@nestjs/common';
import { CreateUserCredential, IdTransformerDto, LoginCredential, UpdateUserCredential } from '@wow-spedoo/dto';
import {UserSelect} from 'prisma';
import { PaginationDto } from '@wow-spedoo/dto';
import { Role, Roles } from '@wow-spedoo/auth';
import { JwtAuthGuard } from '@wow-spedoo/auth';
import { RolesGuard } from '@wow-spedoo/auth';
@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private userService: UserService) {}


  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Post('create')
  async createNewUser(@Body() createUserCredential:CreateUserCredential):Promise<UserSelect|void>{
    try {
      return await this.userService.createUser(createUserCredential);
    }catch(err){
      this.logger.error(err);
      return new HttpException( err.meta,HttpStatus.CONFLICT)
    }
  }



  @Post('login')
  login(@Body() loginCredential:LoginCredential){
    try{
      return  this.userService.login(loginCredential);
    }catch(err){
      this.logger.error(err);
      return new HttpException( 'error',HttpStatus.CONFLICT)
    }
  }


  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Patch("update/:id")
  async updateUser(@Param() param:IdTransformerDto,@Body() updateUser:UpdateUserCredential){
    try{
      const {id} = param;
      return await this.userService.updateUser(id, updateUser);
    }catch(err){
      this.logger.error(err);
      return new HttpException( err.meta,HttpStatus.CONFLICT)
    }
  }


  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Delete('delete/:id')
  async deleteUser(@Param() param:IdTransformerDto){
    try{
      console.log(param);
      const {id} = param;
      return await this.userService.deleteUser(id);
    }catch(err){
      this.logger.error(err);
      return new HttpException({
        status:HttpStatus.CONFLICT,
        error:'can not delete this',
      },HttpStatus.CONFLICT)
    }
  }




  // fetch user based on role


  @Roles(Role.ADMIN,Role.MANAGER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get('partner')
  async getManyPartner(@Query() paginationDto:PaginationDto){
    try{
      return await this.userService.getManyPartner(paginationDto);
    }catch(err){
      this.logger.error(err);
      return new HttpException( err.meta,HttpStatus.CONFLICT)
    }
  }

  @Roles(Role.ADMIN,Role.MANAGER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get('pick-boy')
  async getManyPickBoy(@Query() paginationDto:PaginationDto){
    try{
      return await this.userService.getManyPickBoy(paginationDto);
    }catch(err){
      this.logger.error(err);
      return new HttpException( err.meta,HttpStatus.CONFLICT)
    }
  }

  @Roles(Role.ADMIN,Role.MANAGER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get('delivery-boy')
  async getManyDeliveryBoy(@Query() paginationDto:PaginationDto){
    try{
      return await this.userService.getManyDeliveriesBoy(paginationDto);
    }catch(err){
      this.logger.error(err);
    }
  }


}
