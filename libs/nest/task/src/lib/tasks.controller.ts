import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { NestTaskService } from './tasks.service';
import {
  IdentityDecorator,
  JwtAuthGuard,
  Role,
  Roles,
  RolesGuard,
} from '@wow-spedoo/nest/auth';
import { FileHandler } from '@wow-spedoo/file-handler';
import { IdTransformerDto, UpdateTaskDto } from '@wow-spedoo/nest/dto';

@Controller('tasks')
export class NestTaskController {
  private readonly logger = new Logger();
  constructor(private tasksService: NestTaskService) {}

  @Roles(Role.PICKER, Role.DELIVERY)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('count')
  async count(@IdentityDecorator() identity) {
    try {
      return this.tasksService.getCount(identity);
    } catch (err) {
      this.logger.error(err);
    }
  }
  @Roles(Role.PICKER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('pending/picking')
  async getPendingPickTasks(
    @IdentityDecorator() identity: { role: string; id: number },
  ) {
    try {
      return this.tasksService.getPendingPickTasks(identity);
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Roles(Role.PICKER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('pending/picking/:id')
  getPickTaskDetial(
    @IdentityDecorator() identity,
    @Param() { id }: IdTransformerDto,
  ) {
    try {
      return this.tasksService.getPickTaskDetial(identity.id, id);
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Roles(Role.PICKER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('pending/picking/:id')
  updatePickTaskStatus(
    @Param() { id }: IdTransformerDto,
    @IdentityDecorator() identity: { role: string; id: number },
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    try {
      return this.tasksService.updateTaskStatus(
        { id },
        identity,
        updateTaskDto,
      );
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Roles(Role.PICKER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('pending/picking/:id/image')
  async updateProductImage(
    @FileHandler() file,
    @Param() { id }: IdTransformerDto,
    @IdentityDecorator() identity,
  ) {
    try {
      const rs = await this.tasksService.updateProductImage(
        file,
        id,
        identity.id,
      );
      if (!Object.keys(rs).length) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      return rs;
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Roles(Role.DELIVERY)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('pending/delivery')
  async getPendingDeliveryTasks(
    @IdentityDecorator() identity: { role: string; id: number },
  ) {
    try {
      return this.tasksService.getPendingDeliveryTasks(identity.id);
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Roles(Role.DELIVERY)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('pending/delivery/:id')
  getDeliveryTaskDetial(
    @IdentityDecorator() identity,
    @Param() { id }: IdTransformerDto,
  ) {
    try {
      return this.tasksService.getDeliveryTaskDetial(identity.id, id);
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Roles(Role.DELIVERY)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('pending/delivery/:id')
  async updateDeliveryTaskStatus(
    @Param() { id }: IdTransformerDto,
    @IdentityDecorator() identity: { role: string; id: number },
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    try {
      return this.tasksService.updateTaskStatus(
        { id },
        identity,
        updateTaskDto,
      );
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Roles(Role.DELIVERY)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('pending/delivery/:id/image')
  async updateOrderImage(
    @FileHandler() file,
    @Param() { id }: IdTransformerDto,
    @IdentityDecorator() identity,
  ) {
    try {
      const rs = await this.tasksService.updateOrderImage(
        file,
        id,
        identity.id,
      );
      if (!Object.keys(rs).length) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      return rs;
    } catch (err) {
      this.logger.error(err);
    }
  }
}
