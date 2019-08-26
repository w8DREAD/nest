import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesTableService } from './notesTable.service';
import { Notes } from './notesTable.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notes])],
  providers: [NotesTableService],
  exports: [NotesTableService],
})
export class NotesTableModule {}
