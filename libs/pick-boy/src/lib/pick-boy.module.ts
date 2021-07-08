import { Module } from '@nestjs/common';
import { PickBoyService } from './pick-boy.service';
import { PickBoyController } from './pick-boy.controller';

@Module({
  controllers: [PickBoyController],
  providers: [PickBoyService],
  exports: [PickBoyService],
})
export class PickBoyModule {}
