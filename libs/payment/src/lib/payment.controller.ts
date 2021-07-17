import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard, Role, Roles, RolesGuard } from '@wow-spedoo/auth';
import { AddPaymentDto, IdTransformerDto, UpdatePaymentDto } from '@wow-spedoo/dto';

@Controller('payment')
export class PaymentController {
  private readonly logger = new Logger(PaymentController.name);
  constructor(private paymentService: PaymentService) {}

  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('add')
  async addPaymentMethod(@Body() addPaymentDto:AddPaymentDto) {
    try {
      return await this.paymentService.addPaymentMethod(addPaymentDto);
    } catch (err) {
      this.logger.error(err);
      throw new HttpException({ error: err.code }, HttpStatus.CONFLICT);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAllPaymentMethod() {
    try {
      return await this.paymentService.getAllPaymentMethod();
    } catch (err) {
      this.logger.error(err);
      throw new HttpException({ error: err.code }, HttpStatus.CONFLICT);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getSpecificPaymentMethod(@Param() payment: IdTransformerDto) {
    try {
      return await this.paymentService.getSpecificPaymentMethod(payment);
    } catch (err) {
      this.logger.error(err);
      throw new HttpException({ error: err.code }, HttpStatus.NOT_FOUND);
    }
  }
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async updatePaymentMethod( @Param() payment:IdTransformerDto, @Body() updatePaymentDto: UpdatePaymentDto, ) {
    try {
      return await this.paymentService.updatePaymentMethod( payment, updatePaymentDto, );
    } catch (err) {
      this.logger.error(err);
      throw new HttpException({ error: err.code }, HttpStatus.CONFLICT);
    }
  }
}
