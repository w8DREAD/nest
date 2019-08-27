import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesTableModule } from '../../dbTables/notes/notesTable.module';

@Module({
  imports: [NotesTableModule],
  controllers: [NotesController],
})
export class NotesModule {}
