import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesTableModule } from '../../dbTables/notes/notesTable.module';
import { LikesTableModule } from '../../dbTables/likes/likesTable.module';
import { NotesService } from './notes.service';

@Module({
  imports: [NotesTableModule, LikesTableModule],
  providers: [NotesService],
  controllers: [NotesController],
  exports: [NotesService]
})
export class NotesModule {}
