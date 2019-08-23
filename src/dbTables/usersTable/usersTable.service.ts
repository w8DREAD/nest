import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersTableEntity } from './usersTable.entity';

@Injectable()
export class UsersTableService {
  constructor(
    @InjectRepository(UsersTableEntity)
    private readonly usersRepository: Repository<UsersTableEntity>,
  ) {}

  async findAll(): Promise<UsersTableEntity[]> {
    return await this.usersRepository.find();
  }
}