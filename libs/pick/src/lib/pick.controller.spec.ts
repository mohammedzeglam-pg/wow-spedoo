import { Test } from '@nestjs/testing';
import { PickController } from './pick.controller';
import { PickService } from './pick.service';

describe('PickController', () => {
  let controller: PickController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [PickService],
      controllers: [PickController],
    }).compile();

    controller = module.get(PickController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
