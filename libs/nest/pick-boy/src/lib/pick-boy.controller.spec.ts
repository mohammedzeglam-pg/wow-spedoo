import { Test } from '@nestjs/testing';
import { NestPickBoyController } from './pick-boy.controller';
import { NestPickBoyService } from './pick-boy.service';

describe('NestPickBoyController', () => {
  let controller: NestPickBoyController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [NestPickBoyService],
      controllers: [NestPickBoyController],
    }).compile();

    controller = module.get(NestPickBoyController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
