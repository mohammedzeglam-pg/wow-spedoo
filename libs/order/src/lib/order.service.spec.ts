import { Test } from '@nestjs/testing';
import { OrderService } from './order.service';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [OrderService],
    }).compile();

    service = module.get(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
