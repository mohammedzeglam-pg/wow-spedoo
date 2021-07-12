import { Test } from '@nestjs/testing';
import { SupplierController } from './supplier.controller';
import { SupplierService } from './supplier.service';

describe('SupplierController', () => {
  let controller: SupplierController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [SupplierService],
      controllers: [SupplierController],
    }).compile();

    controller = module.get(SupplierController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
