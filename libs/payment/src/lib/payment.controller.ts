import { Body, Controller, Get, HttpException, HttpStatus, Logger, Param, Post, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard, Role, Roles, RolesGuard } from '@wow-spedoo/auth';
import { IdTransformerDto } from '@wow-spedoo/dto';

@Controller('payment')
export class PaymentController {
  private readonly logger = new Logger(PaymentController.name);
  constructor(private paymentService: PaymentService) {}


  @Roles(Role.ADMIN,Role.MANAGER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Post('add')
  async addPaymentMethod(@Body() obj){
    try {
      return await this.paymentService.addPaymentMethod(obj.name);
    }catch (err){
      this.logger.error(err);
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Already exists',
      }, HttpStatus.CONFLICT);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAllPaymentMethod(){
    try{
      return await this.paymentService.getAllPaymentMethod();
    }catch (err){
      this.logger.error(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getSpecificPaymentMethod(@Param() idTransformerDto:IdTransformerDto){
    try{
      const {id} = idTransformerDto;
      return await this.paymentService.getSpecificPaymentMethod(id);
    }catch (err){
      this.logger.error(err);
    }
  }

}
