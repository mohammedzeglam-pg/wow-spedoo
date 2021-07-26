import { Controller, Get, Logger, Param, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import {
  IdentityDecorator,
  JwtAuthGuard,
  Role,
  Roles,
  RolesGuard,
} from '@wow-spedoo/auth';
import { IdTransformerDto } from '@wow-spedoo/dto';
@Controller('tasks')
export class TasksController {
  private readonly logger = new Logger();
  constructor(private tasksService: TasksService) {}

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

  // try{

  // }catch(err){
  //   this.logger.error(err);
  // }
}
