import { Controller, Logger } from '@nestjs/common';
import { PickBoyService } from './pick-boy.service';

@Controller('pick-boy')
export class PickBoyController {
  private readonly logger = new Logger(PickBoyController.name);
  constructor(private pickBoyService: PickBoyService) {}
}
