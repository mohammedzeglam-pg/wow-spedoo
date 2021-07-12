import { Test } from '@nestjs/testing';
import { SupplierService } from './supplier.service';

describe('SupplierService', () => {
  let service: SupplierService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [SupplierService],
    }).compile();

    service = module.get(SupplierService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
