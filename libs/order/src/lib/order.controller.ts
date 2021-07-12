import { Controller,  Post, Request, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from '@wow-spedoo/dto';
import { JwtAuthGuard, Role, Roles, RolesGuard } from '@wow-spedoo/auth';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Roles(Role.PARTNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Post('create')
  async createOrder(createOrder:CreateOrderDto,@Request() req) {
    const {partner} = req.user;
    const {id} = partner;
    return await this.orderService.addOrder(createOrder,id);
  }
}
