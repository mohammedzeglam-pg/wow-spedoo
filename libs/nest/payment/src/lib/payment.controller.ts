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
  Request,
} from '@nestjs/common';
import { NestPaymentService } from './payment.service';
import { JwtAuthGuard, Role, Roles, RolesGuard } from '@wow-spedoo/nest/auth';
import {
  AddPaymentDto,
  IdTransformerDto,
  UpdatePaymentDto,
} from '@wow-spedoo/nest/dto';
import { BodyMultipart, FileHandler } from '@wow-spedoo/file-handler';
@Controller('payment')
export class NestPaymentController {
  private readonly logger = new Logger(NestPaymentController.name);
  constructor(private paymentService: NestPaymentService) {}

  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('create')
  async addPaymentMethod(
    @FileHandler('image') file,
    @BodyMultipart() addPaymentDto: AddPaymentDto,
  ) {
    try {
      return await this.paymentService.addPaymentMethod(addPaymentDto, file);
    } catch (err) {
      this.logger.error(err);
      throw new HttpException({ error: err.code }, HttpStatus.CONFLICT);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
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
  async updatePaymentMethod(
    @Param() payment: IdTransformerDto,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    try {
      return await this.paymentService.updatePaymentMethod(
        payment,
        updatePaymentDto,
      );
    } catch (err) {
      this.logger.error(err);
      throw new HttpException({ error: err.code }, HttpStatus.CONFLICT);
    }
  }
}
