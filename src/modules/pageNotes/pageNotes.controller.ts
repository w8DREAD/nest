import { Controller, Get, Render, Res, HttpStatus} from '@nestjs/common';
import { UsersTableService } from '../../dbTables/usersTable/usersTable.service';

@Controller('/pageNotes')
export class PageNotesController {
  constructor(private readonly users: UsersTableService) {
  }

  @Get()
  @Render('notes')
  root() {
    this.findAll();
    return {
      news: 'Тут будут новости',
      addClassNews: 'active',
    };
  }

  async findAll(): Promise<any> {
    console.log(await this.users.findAll());
  }
}