import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard, Role, Roles, RolesGuard } from '@wow-spedoo/auth';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}


  @Roles(Role.ADMIN,Role.MANAGER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Post('add')
  async addPaymentMethod(@Body() name:string){
    return await this.paymentService.addPaymentMethod(name);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAllPaymentMethod(){
    return await this.paymentService.getAllPaymentMethod();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getSpecificPaymentMethod(@Param() id:number){
    return await this.paymentService.getSpecificPaymentMethod(id);
  }

}
