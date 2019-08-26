import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsTableService } from './commentsTable.service';
import { Comments } from './commentsTable.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comments])],
  providers: [CommentsTableService],
  exports: [CommentsTableService],
})
export class CommentsTableModule {}
