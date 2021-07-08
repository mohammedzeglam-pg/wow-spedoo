import { Controller, Logger, Post } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  async addOrder(order) {
    Logger.log(order);
  }
  //TODO: method to return to user with the price
}
