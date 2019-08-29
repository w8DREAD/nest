import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesTableService } from './likesTable.service';
import { Likes } from './likesTable.entity';
import { Notes } from '../notes/notesTable.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Likes, Notes])],
  providers: [LikesTableService],
  exports: [LikesTableService],
})
export class LikesTableModule {}
