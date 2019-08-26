import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersTableService } from './usersTable.service';
import { UsersTableEntity } from './userstable.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersTableEntity])],
  providers: [UsersTableService],
  exports: [UsersTableService],
})
export class UsersTableModule {}