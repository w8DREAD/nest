import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Likes } from './likesTable.entity';
import { Notes } from '../notes/notesTable.entity';
import { Users } from '../users/usersTable.entity';
import * as Redis from 'ioredis';
import { InjectRedisClient } from 'nestjs-ioredis';

@Injectable()
export class LikesTableService {
  constructor(
    @InjectRepository(Likes)
    private readonly likesRepository: Repository<Likes>,
    @InjectRepository(Notes)
    private readonly notesRepository: Repository<Notes>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRedisClient('test')
    private readonly redis: Redis.Redis,
  ) {}

  async findAll(userId, noteId): Promise<Likes> {
    return await this.likesRepository.findOne({user: userId, note: noteId});
  }

  async findAllLikesUser(noteId): Promise<number> {
    const user = await this.notesRepository
        .createQueryBuilder('notes')
        .leftJoinAndSelect('notes.user', 'user')
        .select('user')
        .where('notes.id = :id', {id: noteId})
        .getRawOne();
    const likesCount = await this.likesRepository
      .createQueryBuilder('likes')
      .leftJoinAndSelect('likes.note', 'notes')
      .select('likes')
      .where('notes.\"userId\" = :id', {id: user.user_id})
      .getCount();
    const last10Notes = await this.notesRepository
      .createQueryBuilder('notes')
      .where('notes.\"userId\" = :id', {id: user.user_id})
      .leftJoinAndSelect('notes.like', 'likes')
      .orderBy('notes.date', 'DESC')
      .take(10)
      .getMany();
    let likesLast10Notes = 0;
    for (const arrayCurrent of last10Notes) {
      for (const prop in arrayCurrent) {
        if (prop === 'like') {
          likesLast10Notes += arrayCurrent[prop].length;
        }
      }
    }
    await this.redis.hset('likesLast10Notes', `${user.user_email}`, likesLast10Notes);

    await this.redis.hset('likes', `${user.user_email}`, likesCount);
    return likesCount;
  }

  async save(userId, noteId): Promise<number> {
    await this.likesRepository.save({user: userId, note: noteId});
    return this.findAllLikesUser(noteId);
  }

  async remove(userId, noteId): Promise <number> {
    await this.likesRepository.delete({user: userId, note: noteId});
    return this.findAllLikesUser(noteId);
  }

  async recountMaxLikes(): Promise<number> {
    const allLikes = await this.redis.hgetall('likes');
    let maxLikes = 0;
    for (const likes in allLikes) {
      if (Number(allLikes[likes]) > maxLikes) {
        maxLikes = Number(allLikes[likes]);
      }
    }
    await this.redis.set('maxLikes', maxLikes);
    return maxLikes;
  }

  async recountMaxLikesLast10Notes(): Promise<number> {
    const allLikes = await this.redis.hgetall('likesLast10Notes');
    let maxLikes = 0;
    for (const likes in allLikes) {
      if (Number(allLikes[likes]) > maxLikes) {
        maxLikes = Number(allLikes[likes]);
      }
    }
    await this.redis.set('maxLikesLast10Notes', maxLikes);
    return maxLikes;
  }

}
