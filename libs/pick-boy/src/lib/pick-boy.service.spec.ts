import { Test } from '@nestjs/testing';
import { PickBoyService } from './pick-boy.service';

describe('PickBoyService', () => {
  let service: PickBoyService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [PickBoyService],
    }).compile();

    service = module.get(PickBoyService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
