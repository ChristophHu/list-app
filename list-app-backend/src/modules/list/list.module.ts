import { Module } from '@nestjs/common';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { ItemModule } from './item/item.module';

@Module({
  controllers: [ListController],
  providers: [ListService],
  imports: [ItemModule]
})
export class ListModule {}
