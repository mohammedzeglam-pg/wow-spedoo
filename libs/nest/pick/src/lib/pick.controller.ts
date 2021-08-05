import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NestPickService } from './pick.service';
import {
  AddPickTaskDto,
  IdTransformerDto,
  PaginationDto,
} from '@wow-spedoo/nest/dto';
import { JwtAuthGuard, Role, Roles, RolesGuard } from '@wow-spedoo/nest/auth';

@Controller('pick')
export class NestPickController {
  private readonly logger = new Logger(NestPickController.name);
  constructor(private readonly pickService: NestPickService) {}

  @Roles(Role.MANAGER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('completed')
  async getFinishedPickTasks(@Query() paginationDto: PaginationDto) {
    try {
      return this.pickService.getFinishedPickTasks(paginationDto);
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Roles(Role.MANAGER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('')
  async getUnfinishedPickTasks(@Query() paginationDto: PaginationDto) {
    try {
      return this.pickService.getUnfinishedPickTasks(paginationDto);
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Roles(Role.MANAGER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('add')
  async addPickTask(@Body() addPickTaskDto: AddPickTaskDto) {
    try {
      return this.pickService.addPickTask(addPickTaskDto);
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Roles(Role.MANAGER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('task')
  async getTasks(@Param() pagination: PaginationDto) {
    try {
      return this.pickService.getTasks(pagination);
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Roles(Role.MANAGER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('product')
  async getProducts() {
    return this.pickService.getProducts();
  }
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('boy/:id')
  async getPickBoies(@Param() id: IdTransformerDto) {
    return this.pickService.getPickBoies(id);
  }
}
