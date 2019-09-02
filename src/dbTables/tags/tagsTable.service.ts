import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectDb } from 'nest-mongodb';
import * as mongo from 'mongodb';
import { Repository } from 'typeorm';
import { Tags } from './tagsTable.entity';
import { Notes } from '../notes/notesTable.entity';
import { Users } from '../users/usersTable.entity';

@Injectable()
export class TagsTableService {
  private readonly collection: mongo.Collection;
  constructor(
    @InjectDb()
    private readonly db: mongo.Db,
    @InjectRepository(Tags)
    private readonly tagsRepository: Repository<Tags>,
    @InjectRepository(Notes)
    private readonly notesRepository: Repository<Notes>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {
    this.collection = this.db.collection('users');
  }

  async findAll(): Promise<Tags[]> {
    return await this.tagsRepository.find();
  }

  async save(tag): Promise<Notes[]> {
    return await this.tagsRepository.save(tag);
  }
  async updateTags(tag): Promise<any> {
    const user = await this.notesRepository
      .createQueryBuilder('notes')
      .leftJoinAndSelect('notes.user', 'user')
      .select('user')
      .where('notes.id = :id', {id: tag.note})
      .getRawOne();
    const tagsText = await this.tagsRepository
      .createQueryBuilder('tags')
      .leftJoinAndSelect('tags.note', 'notes')
      .select('tags')
      .where('notes.\"userId\" = :id', {id: user.user_id})
      .getRawMany();
    console.log(user);
    console.log(tagsText);
    return true;
  }
}
