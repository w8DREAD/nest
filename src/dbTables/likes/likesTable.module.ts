import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesTableService } from './likesTable.service';
import { Likes } from './likesTable.entity';
import { Notes } from '../notes/notesTable.entity';
import { Users } from '../users/usersTable.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Likes, Notes, Users])],
  providers: [LikesTableService],
  exports: [LikesTableService],
})
export class LikesTableModule {}
