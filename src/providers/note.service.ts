import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { NoteInterfaces } from '../interfaces/note.interfaces';
import { UsersTableEntity } from '../dbTables/usersTable.entity';

@Injectable()
export class NoteService {
  constructor(
    @Inject('USERS_TABLE')
    private readonly photoRepository: Repository<UsersTableEntity>,
  ) {}
  // async findAll(): Promise<UsersTableEntity[]> {
  //   // return await this.photoRepository.find();
  // }
}
