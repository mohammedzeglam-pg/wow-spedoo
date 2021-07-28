import { Test } from '@nestjs/testing';
import { NestRegionController } from './zone.controller';
import { NestRegionService } from './zone.service';

describe('NestRegionController', () => {
  let controller: NestRegionController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [NestRegionService],
      controllers: [NestRegionController],
    }).compile();

    controller = module.get(NestRegionController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
