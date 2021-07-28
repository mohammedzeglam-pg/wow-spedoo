import { Test } from '@nestjs/testing';
import { NestPartnerController } from './partner.controller';
import { NestPartnerService } from './partner.service';

describe('NestPartnerController', () => {
  let controller: NestPartnerController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [NestPartnerService],
      controllers: [NestPartnerController],
    }).compile();

    controller = module.get(NestPartnerController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
