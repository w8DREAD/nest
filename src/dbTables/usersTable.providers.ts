import { Connection, Repository } from 'typeorm';
import { UsersTableEntity } from './usersTable.entity';

export const UsersTableProviders = [
  {
    provide: 'USERS_TABLE',
    useFactory: (connection: Connection) => connection.getRepository(UsersTableEntity),
    inject: ['DATABASE_CONNECTION'],
  },
];