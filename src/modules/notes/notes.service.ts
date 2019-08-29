import { Injectable, Inject } from '@nestjs/common';
import { InjectRedisClient } from 'nestjs-ioredis';
import { LikesTableService } from '../../dbTables/likes/likesTable.service';
import { NotesTableService } from '../../dbTables/notes/notesTable.service';
import * as Redis from 'ioredis';

@Injectable()
export class NotesService {
  constructor(
    @InjectRedisClient('test') private readonly redis: Redis.Redis,
    private readonly likes: LikesTableService,
    private readonly notes: NotesTableService,
    ) {}
  async redisLike(user): Promise<any> {
    // const likesCount = await
    // const likesCount = await handler.Likes.takeFromDb(`SELECT COUNT(*) AS count FROM likes WHERE noteId IN (SELECT id FROM notes WHERE userId = ${user.id})`);
    // const last10NotesLikes = await handler.Likes.takeFromDb(`SELECT COUNT(*) AS count FROM likes WHERE noteId IN (SELECT id FROM notes WHERE userId = ${user.id} ORDER BY date DESC LIMIT 10)`);
    // await this.redis.hset('likes', `${user.email}`, likesCount[0].count);
    // await this.redis.hset('last10NotesLike', `${user.email}`, last10NotesLikes[0].count);
    // return true;
  }
}
