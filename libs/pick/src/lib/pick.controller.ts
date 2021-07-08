import { Controller } from '@nestjs/common';
import { PickService } from './pick.service';

@Controller('pick')
export class PickController {
  constructor(private pickService: PickService) {}
}
