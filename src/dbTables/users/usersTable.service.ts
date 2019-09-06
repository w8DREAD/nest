import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectDb } from 'nest-mongodb';
import * as mongo from 'mongodb';
import { Repository } from 'typeorm';
import { Users } from './usersTable.entity';

@Injectable()
export class UsersTableService {
  private readonly collection: mongo.Collection;
  constructor(
    @InjectDb()
    private readonly db: mongo.Db,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {
    this.collection = this.db.collection('users');
  }

  async findAll(): Promise<Users[]> {
    return await this.usersRepository.find();
  }

  async findOne(prop): Promise<Users> {
    return await this.usersRepository.findOne(prop);
  }

  async save(user): Promise<Users[]> {
    return await this.usersRepository.save(user);
  }

  async saveInMongo(user): Promise<boolean> {
    await this.collection.insertOne(user);
    return true;
  }
}
