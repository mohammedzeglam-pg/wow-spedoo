import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { NestOrderService } from './order.service';
import {
  CreateOrderDto,
  IdTransformerDto,
  LocationDto,
  PaginationDto,
} from '@wow-spedoo/nest/dto';
import {
  ApiKeyAuthGuard,
  ApiKeyDecorator,
  JwtAuthGuard,
  Role,
  Roles,
  RolesGuard,
} from '@wow-spedoo/nest/auth';

@Controller('order')
export class NestOrderController {
  private readonly logger = new Logger(NestOrderController.name);
  constructor(private readonly orderService: NestOrderService) {}
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('')
  async getManyOrder(@Param() paginationDto: PaginationDto) {
    return this.orderService.getManyOrder(paginationDto);
  }
  @UseGuards(ApiKeyAuthGuard)
  @Post('')
  async addOrder(
    @Body() createOrder: CreateOrderDto,
    @ApiKeyDecorator() token,
  ) {
    try {
      return await this.orderService.addOrder(createOrder, token);
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  @UseGuards(ApiKeyAuthGuard)
  @Get(':id')
  async getOrderDetails(
    @Param() orderIdentifier: IdTransformerDto,
    @Request() req,
  ) {
    try {
      const { id } = orderIdentifier;
      const { token } = req.headers;
      return await this.orderService.getOrderDetails(id, token);
    } catch (err) {
      this.logger.error(err);
    }
  }

  @UseGuards(ApiKeyAuthGuard)
  @Get('pricing')
  async getPricing(@Query() location: LocationDto) {
    const price = await this.orderService.getPricing(location);
    if (!price) {
      return new HttpException('حاليا غير متوفر', HttpStatus.NOT_FOUND);
    }
    return { price };
  }
}
