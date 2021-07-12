import { Test } from '@nestjs/testing';
import { ZoneController } from './zone.controller';
import { ZoneService } from './zone.service';

describe('ZoneController', () => {
  let controller: ZoneController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ZoneService],
      controllers: [ZoneController],
    }).compile();

    controller = module.get(ZoneController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
