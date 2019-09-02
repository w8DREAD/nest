import { Module } from '@nestjs/common';
import { PageNotesController } from './pageNotes.controller';
import { PageNotesService } from './pageNotes.service';
import { UsersTableModule } from '../../dbTables/users/usersTable.module';
import { NotesTableModule } from '../../dbTables/notes/notesTable.module';
import { LikesTableModule } from '../../dbTables/likes/likesTable.module';
import { TagsTableModule } from '../../dbTables/tags/tagsTable.module';

@Module({
  imports: [UsersTableModule, NotesTableModule, LikesTableModule, TagsTableModule],
  controllers: [PageNotesController],
  providers: [PageNotesService],
  exports: [PageNotesService],
})
export class PageNotesModule {}
