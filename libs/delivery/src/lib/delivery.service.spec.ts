import { Test } from '@nestjs/testing';
import { DeliveryService } from './delivery.service';

describe('DeliveryService', () => {
  let service: DeliveryService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [DeliveryService],
    }).compile();

    service = module.get(DeliveryService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
