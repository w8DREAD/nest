import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersTableService } from './usersTable.service';
import { Users } from './usersTable.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersTableService],
  exports: [UsersTableService],
})
export class UsersTableModule {}
