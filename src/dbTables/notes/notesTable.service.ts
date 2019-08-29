import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notes } from './notesTable.entity';

@Injectable()
export class NotesTableService {
  constructor(
    @InjectRepository(Notes)
    private readonly notesRepository: Repository<Notes>,
  ) {}

  async findAll(): Promise<Notes[]> {
    return await this.notesRepository
      .createQueryBuilder('notes')
      .leftJoinAndSelect('notes.user', 'user')
      .leftJoinAndSelect('notes.tag', 'tag')
      .leftJoinAndSelect('notes.comment', 'comment')
      .getMany();
  }

  async save(note): Promise<Notes[]> {
    return await this.notesRepository.save(note);
  }
  async edit(id, text): Promise<any> {
    return await this.notesRepository.update(id, {text});
  }
  async remove(id): Promise <any> {
    return await this.notesRepository.delete(id);
  }
}
