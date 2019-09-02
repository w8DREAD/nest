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
}
