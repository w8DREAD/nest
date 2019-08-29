import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tags } from './tagsTable.entity';
import { Notes } from '../notes/notesTable.entity';

@Injectable()
export class TagsTableService {
  constructor(
    @InjectRepository(Tags)
    private readonly tagsRepository: Repository<Tags>,
  ) {}

  async findAll(): Promise<Tags[]> {
    return await this.tagsRepository.find();
  }

  async save(tag): Promise<Notes[]> {
    return await this.tagsRepository.save(tag);
  }
}
