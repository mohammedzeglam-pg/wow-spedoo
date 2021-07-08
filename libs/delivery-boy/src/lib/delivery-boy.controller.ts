import { Controller } from '@nestjs/common';
import { DeliveryBoyService } from './delivery-boy.service';

@Controller('delivery-boy')
export class DeliveryBoyController {
  constructor(private deliveryBoyService: DeliveryBoyService) {}
}
