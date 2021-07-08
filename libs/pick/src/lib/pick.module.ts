import { Module } from '@nestjs/common';
import { PickService } from './pick.service';
import { PickController } from './pick.controller';

@Module({
  controllers: [PickController],
  providers: [PickService],
  exports: [PickService],
})
export class PickModule {}
