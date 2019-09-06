import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comments } from './commentsTable.entity';
import { Notes } from '../notes/notesTable.entity';

@Injectable()
export class CommentsTableService {
  constructor(
    @InjectRepository(Comments)
    private readonly commentsRepository: Repository<Comments>,
  ) {}

  async findAll(): Promise<Comments[]> {
    return await this.commentsRepository.find();
  }
  async save(comment): Promise<Comments[]> {
    return await this.commentsRepository.save(comment);
  }
  async remove(id): Promise <any> {
    return await this.commentsRepository.delete(id);
  }
}
