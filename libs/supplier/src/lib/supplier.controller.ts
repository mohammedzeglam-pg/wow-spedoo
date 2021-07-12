import { Controller } from '@nestjs/common';
import { SupplierService } from './supplier.service';

@Controller('supplier')
export class SupplierController {
  constructor(private supplierService: SupplierService) {}
}
