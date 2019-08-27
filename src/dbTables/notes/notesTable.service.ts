import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notes } from './notesTable.entity';
import { Users } from '../users/usersTable.entity';

@Injectable()
export class NotesTableService {
  constructor(
    @InjectRepository(Notes)
    private readonly notesRepository: Repository<Notes>,
  ) {}

  async findAll(): Promise<Notes[]> {
    return await this.notesRepository.find();
  }

  async save(note): Promise<Notes[]> {
    return await this.notesRepository.save(note);
  }
}
