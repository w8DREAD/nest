import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersTableModule } from '../../dbTables/users/usersTable.module';

@Module({
  imports: [UsersTableModule],
  controllers: [UsersController],
})
export class UsersModule {}
