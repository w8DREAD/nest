import { Module } from '@nestjs/common';
import { PageNotesController } from './pageNotes.controller';
import { PageNotesService } from './pageNotes.service';
import { UsersTableModule } from '../../dbTables/users/usersTable.module';
import { NotesTableModule } from '../../dbTables/notes/notesTable.module';
import { LikesTableModule } from '../../dbTables/likes/likesTable.module';

@Module({
  imports: [UsersTableModule, NotesTableModule, LikesTableModule],
  controllers: [PageNotesController],
  providers: [PageNotesService],
  exports: [PageNotesService],
})
export class PageNotesModule {}
