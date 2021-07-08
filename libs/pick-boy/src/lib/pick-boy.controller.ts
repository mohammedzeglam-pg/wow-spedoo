import { Controller } from '@nestjs/common';
import { PickBoyService } from './pick-boy.service';

@Controller('pick-boy')
export class PickBoyController {
  constructor(private pickBoyService: PickBoyService) {}
}
