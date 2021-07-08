import { Test } from '@nestjs/testing';
import { DeliveryBoyService } from './delivery-boy.service';

describe('DeliveryBoyService', () => {
  let service: DeliveryBoyService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [DeliveryBoyService],
    }).compile();

    service = module.get(DeliveryBoyService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
