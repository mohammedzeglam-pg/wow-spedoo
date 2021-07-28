import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NestDeliveryService } from './delivery.service';
import { AddDeliveryTaskDto, PaginationDto } from '@wow-spedoo/nest/dto';
import { JwtAuthGuard, Role, Roles, RolesGuard } from '@wow-spedoo/nest/auth';

@Controller('delivery')
export class NestDeliveryController {
  private readonly logger = new Logger(NestDeliveryController.name);
  constructor(private deliveryService: NestDeliveryService) {}

  @Roles(Role.MANAGER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('finished')
  async getFinishedTasks(@Query() paginationDto: PaginationDto) {
    try {
      return this.deliveryService.getFinishedTasks(paginationDto);
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Roles(Role.MANAGER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('unfinished')
  async getUnfinishedTasks(@Query() paginationDto: PaginationDto) {
    try {
      return this.deliveryService.getUnfinishedTasks(paginationDto);
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Roles(Role.MANAGER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('add')
  async addTask(@Body() addDeliveryTaskDto: AddDeliveryTaskDto) {
    try {
      return this.deliveryService.addTask(addDeliveryTaskDto);
    } catch (err) {
      this.logger.error(err);
    }
  }
}
