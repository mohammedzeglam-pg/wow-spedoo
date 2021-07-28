import { Test } from '@nestjs/testing';
import { NestRegionService } from './zone.service';

describe('NestRegionService', () => {
  let service: NestRegionService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [NestRegionService],
    }).compile();

    service = module.get(NestRegionService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
