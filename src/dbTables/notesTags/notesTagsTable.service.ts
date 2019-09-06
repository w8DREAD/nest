import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotesTags } from './notesTagsTable.entity';

@Injectable()
export class NotesTagsTableService {
  constructor(
    @InjectRepository(NotesTags)
    private readonly notesTagsRepository: Repository<NotesTags>,
  ) {}

  async findAll(): Promise<NotesTags[]> {
    return await this.notesTagsRepository.find();
  }
}
