import { Controller, Post, Res, Body } from '@nestjs/common';
import { UsersTableService } from '../../dbTables/users/usersTable.service';
import { AddUsersDto } from '../../dto/users.dto';
import { Response } from 'express';

@Controller('/api/v2')
export class UsersController {
  constructor(
    private readonly users: UsersTableService,
  ) {}
@Post('/users')
  async add(@Res() res, @Body() addUsersDto: AddUsersDto) {
    await this.users.save(addUsersDto);
    await this.users.saveInMongo(addUsersDto);
    res.redirect('/login');
  }
}
