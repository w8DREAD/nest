import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesTagsTableService } from './notesTagsTable.service';
import { NotesTags } from './notesTagsTable.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NotesTags])],
  providers: [NotesTagsTableService],
  exports: [NotesTagsTableService],
})
export class NotesTagsTableModule {}
