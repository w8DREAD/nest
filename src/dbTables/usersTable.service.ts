import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsersTableEntity } from './usersTable.entity';

@Injectable()
export class UsersTableService {
  constructor(
    @Inject('USERS_TABLE')
    private readonly photoRepository: Repository<UsersTableEntity>,
  ) {}

  async findAll(): Promise<UsersTableEntity[]> {
    return await this.photoRepository.find();
  }
}