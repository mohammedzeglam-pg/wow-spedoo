import { Test } from '@nestjs/testing';
import { NestSupplierController } from './supplier.controller';
import { NestSupplierService } from './supplier.service';

describe('NestSupplierController', () => {
  let controller: NestSupplierController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [NestSupplierService],
      controllers: [NestSupplierController],
    }).compile();

    controller = module.get(NestSupplierController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
