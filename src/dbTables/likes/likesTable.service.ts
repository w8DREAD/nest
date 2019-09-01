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

  async findAll(userId, noteId): Promise<Likes> {
    return await this.likesRepository.findOne({user: userId, note: noteId});
  }

  async findAllLikesUser(noteId): Promise<any> {
    const likes = await this.notesRepository
        .createQueryBuilder('notes')
        .select('notes.user', 'user')
        .where('notes.id = :id', {id: noteId})
        .getRawOne();
    return likes;
  }

  async save(userId, noteId): Promise<any> {
    return await this.likesRepository.save({user: userId, note: noteId});
  }

  async remove(userId, noteId): Promise <any> {
    return await this.likesRepository.delete({user: userId, note: noteId});
  }
}