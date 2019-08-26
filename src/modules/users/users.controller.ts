import { Controller, Post, Res, Body } from '@nestjs/common';
import { UsersTableService } from '../../dbTables/users/usersTable.service';
import { AddUsersDto } from '../../dto/users.dto';
import { Response } from 'express';

@Controller('/api/v2')
export class UsersController {
  constructor(private readonly users: UsersTableService) {}
@Post('/users')
  async add(@Body() addUsersDto: AddUsersDto) {
    console.log(addUsersDto);
    return  this.users.save(addUsersDto);
}
}
