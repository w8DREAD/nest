import { Module } from '@nestjs/common';
import { AddNoteController } from './addNote.controller';

@Module({
  controllers: [AddNoteController],
})
export class AddNoteModule {}
