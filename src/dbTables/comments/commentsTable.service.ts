import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comments } from './commentsTable.entity';

@Injectable()
export class CommentsTableService {
  constructor(
    @InjectRepository(Comments)
    private readonly commentsRepository: Repository<Comments>,
  ) {}

  async findAll(): Promise<Comments[]> {
    return await this.commentsRepository.find();
  }
}
