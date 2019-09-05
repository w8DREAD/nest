import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesTableService } from './likesTable.service';
import { Likes } from './likesTable.entity';
import { Notes } from '../notes/notesTable.entity';
import { Users } from '../users/usersTable.entity';
import { MongoModule } from 'nest-mongodb';
@Module({
  imports: [TypeOrmModule.forFeature([Likes, Notes, Users]),
    MongoModule.forRoot('mongodb://mongo:27017', 'usersdb')],
  providers: [LikesTableService],
  exports: [LikesTableService],
})
export class LikesTableModule {}
