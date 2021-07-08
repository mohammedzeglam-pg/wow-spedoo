import { Test } from '@nestjs/testing';
import { PickBoyController } from './pick-boy.controller';
import { PickBoyService } from './pick-boy.service';

describe('PickBoyController', () => {
  let controller: PickBoyController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [PickBoyService],
      controllers: [PickBoyController],
    }).compile();

    controller = module.get(PickBoyController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
