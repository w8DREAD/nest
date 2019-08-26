import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesTableService } from './likesTable.service';
import { Likes } from './likesTable.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Likes])],
  providers: [LikesTableService],
  exports: [LikesTableService],
})
export class LikesTableModule {}
