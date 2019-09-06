import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersTableService } from './usersTable.service';
import { Users } from './usersTable.entity';
import { MongoModule } from 'nest-mongodb';

@Module({
  imports: [TypeOrmModule.forFeature([Users]),
    MongoModule.forRoot('mongodb://mongo:27017', 'usersdb')],
  providers: [UsersTableService],
  exports: [UsersTableService],
})
export class UsersTableModule {}
