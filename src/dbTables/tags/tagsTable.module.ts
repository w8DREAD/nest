import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsTableService } from './tagsTable.service';
import { Tags } from './tagsTable.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tags])],
  providers: [TagsTableService],
  exports: [TagsTableService],
})
export class TagsTableModule {}
