import { Test } from '@nestjs/testing';
import { NestOrderService } from './order.service';

describe('NestOrderService', () => {
  let service: NestOrderService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [NestOrderService],
    }).compile();

    service = module.get(NestOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
