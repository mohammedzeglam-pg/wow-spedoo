import { Test } from '@nestjs/testing';
import { NestDeliveryService } from './delivery.service';

describe('NestDeliveryService', () => {
  let service: NestDeliveryService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [NestDeliveryService],
    }).compile();

    service = module.get(NestDeliveryService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
