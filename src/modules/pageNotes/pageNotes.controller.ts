import { Controller, Get, Render, Res, HttpStatus} from '@nestjs/common';
import { UsersTableService } from '../../dbTables/users/usersTable.service';

@Controller('/pageNotes')
export class PageNotesController {
    constructor(private readonly users: UsersTableService) {}
  @Get()
  @Render('notes')
  async root() {
      return {
      news: 'Тут будут новости',
      addClassNews: 'active',
    };
  }
}
