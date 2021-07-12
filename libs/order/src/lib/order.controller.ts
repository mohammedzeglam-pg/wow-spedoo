import { Controller, Logger, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from '@wow-spedoo/dto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('create')
  async createOrder(createOrder:CreateOrderDto) {
    Logger.log(createOrder);
  }
}
