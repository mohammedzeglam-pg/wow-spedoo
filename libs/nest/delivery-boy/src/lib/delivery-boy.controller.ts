import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NestDeliveryBoyService } from './delivery-boy.service';
import {
  NestDeliveryBoyDecorator,
  JwtAuthGuard,
  Role,
  Roles,
  RolesGuard,
} from '@wow-spedoo/nest/auth';
import { PaginationDto, UpdateDeliveryDto } from '@wow-spedoo/nest/dto';

@Controller('delivery-boy')
export class NestDeliveryBoyController {
  private readonly logger = new Logger(NestDeliveryBoyController.name);
  constructor(private deliveryBoyService: NestDeliveryBoyService) {}

  @Roles(Role.DELIVERY)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('completed')
  async getFinishedTasks(
    @NestDeliveryBoyDecorator() id,
    @Query() paginationDto: PaginationDto,
  ) {
    try {
      return this.deliveryBoyService.getFinishedTasks(id, paginationDto);
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.code, HttpStatus.NOT_FOUND);
    }
  }

  @Roles(Role.DELIVERY)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('work')
  async getUnfinishedTasks(
    @NestDeliveryBoyDecorator() id,
    @Query() paginationDto: PaginationDto,
  ) {
    try {
      return this.deliveryBoyService.getUnfinshedTasks(id, paginationDto);
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.code, HttpStatus.NOT_FOUND);
    }
  }

  @Roles(Role.DELIVERY)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('update')
  async updateTaskStatus(
    @NestDeliveryBoyDecorator() id,
    @Body() task: UpdateDeliveryDto,
  ) {
    try {
      return this.deliveryBoyService.updateTask(id, task);
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.code, HttpStatus.NOT_FOUND);
    }
  }
}
