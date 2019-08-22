import { Module } from '@nestjs/common';
import { DatabaseModule } from '../typeORM/database.module';
import { UsersTableProviders } from './usersTable.providers';
import { UsersTableService } from './usersTable.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...UsersTableProviders,
    UsersTableService,
  ],
})
export class UsersTableModule {}
