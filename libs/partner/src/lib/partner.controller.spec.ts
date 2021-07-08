import { Test } from '@nestjs/testing';
import { PartnerController } from './partner.controller';
import { PartnerService } from './partner.service';

describe('PartnerController', () => {
  let controller: PartnerController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [PartnerService],
      controllers: [PartnerController],
    }).compile();

    controller = module.get(PartnerController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
