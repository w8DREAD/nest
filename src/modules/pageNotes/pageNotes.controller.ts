import { Controller, Get, Render } from '@nestjs/common';
import { UsersTableService } from '../../dbTables/users/usersTable.service';
import { NotesTableService } from '../../dbTables/notes/notesTable.service';
import { LikesTableService } from '../../dbTables/likes/likesTable.service';

@Controller('/pageNotes')
export class PageNotesController {
    constructor(
      private readonly users: UsersTableService,
      private readonly notes: NotesTableService,
      private readonly likes: LikesTableService,
    ) {}
  @Get()
  @Render('notes')
  async root() {
      const comment = await this.notes.findAll();
      console.log(comment[0].comment[0]);
      return {
      news: 'Тут будут новости',
      addClassNews: 'active',
        notes: await this.notes.findAll(),
    };
  }
}
