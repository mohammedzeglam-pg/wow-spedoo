import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserCredential } from './dto/create-user-credential.dto';
import { LoginCredential } from './dto/login-credential.dto';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  async signup(@Body() user: CreateUserCredential) {
    try {
      const result = await this.userService.signup(user);
      return result;
    } catch (e) {
      return e;
    }
  }
  @Post('login')
  async login(@Body() user: LoginCredential) {
    const result = await this.userService.login(user);
    return result;
  }
  @Get('/partner')
  async allPartner(){
    const partner = await this.userService.allPartner();
    return partner;
  }
}
