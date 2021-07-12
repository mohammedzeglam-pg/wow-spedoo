import { Test } from '@nestjs/testing';
import { ZoneService } from './zone.service';

describe('ZoneService', () => {
  let service: ZoneService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ZoneService],
    }).compile();

    service = module.get(ZoneService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
