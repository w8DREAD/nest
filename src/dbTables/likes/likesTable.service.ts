import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Likes } from './likesTable.entity';
import { Notes } from '../notes/notesTable.entity';

@Injectable()
export class LikesTableService {
  constructor(
    @InjectRepository(Likes)
    private readonly likesRepository: Repository<Likes>,
    @InjectRepository(Notes)
    private readonly notesRepository: Repository<Notes>,
  ) {}

  async findAll(prop): Promise<Likes[]> {
    return await this.likesRepository.find(prop);
  }

  async findAllLikesUser(user): Promise<any> {
    const likes = await this.notesRepository.find({select: ['id'], where: {user_id: 1}});
    return likes;
  }

  async save(userId, noteId): Promise<any> {
    return await this.likesRepository.save({user: userId, note: noteId});
  }

  async remove(userId, noteId): Promise <any> {
    return await this.likesRepository.delete({user: userId, note: noteId});
  }
}
