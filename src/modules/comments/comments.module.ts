import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsTableModule } from '../../dbTables/comments/commentsTable.module';

@Module({
  imports: [CommentsTableModule],
  controllers: [CommentsController],
})
export class CommentsModule {}
