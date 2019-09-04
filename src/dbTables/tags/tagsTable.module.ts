import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsTableService } from './tagsTable.service';
import { Tags } from './tagsTable.entity';
import { MongoModule } from 'nest-mongodb';
import { NotesModule } from '../../modules/notes/notes.module';
import { Notes } from '../notes/notesTable.entity';
import { UsersTableModule } from '../users/usersTable.module';
import { Users } from '../users/usersTable.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tags, Notes, Users]),
    // MongoModule.forRoot('mongodb://localhost:27017', 'usersdb'),
    NotesModule, UsersTableModule],
  providers: [TagsTableService],
  exports: [TagsTableService],
})
export class TagsTableModule {}
