import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Likes } from './likesTable.entity';

@Injectable()
export class LikesTableService {
  constructor(
    @InjectRepository(Likes)
    private readonly likesRepository: Repository<Likes>,
  ) {}

  async findAll(): Promise<Likes[]> {
    return await this.likesRepository.find();
  }
}
