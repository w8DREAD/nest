import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsTableModule } from '../../dbTables/tags/tagsTable.module';

@Module({
  imports: [TagsTableModule],
  controllers: [TagsController],
})
export class TagsModule {}
