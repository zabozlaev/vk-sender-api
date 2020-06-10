import { Module } from '@nestjs/common';
import { TargetService } from './target.service';
import { TargetController } from './target.controller';

@Module({
  imports: [],
  controllers: [TargetController],
  providers: [TargetService],
  exports: [TargetService],
})
export class TargetModule {}
