import { Test } from '@nestjs/testing';
import { NestDeliveryBoyService } from './delivery-boy.service';

describe('NestDeliveryBoyService', () => {
  let service: NestDeliveryBoyService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [NestDeliveryBoyService],
    }).compile();

    service = module.get(NestDeliveryBoyService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
