import { Controller, Get, Render } from '@nestjs/common';
import { UsersTableService } from '../../dbTables/users/usersTable.service';
import { NotesTableService } from '../../dbTables/notes/notesTable.service';
import { LikesTableService } from '../../dbTables/likes/likesTable.service';
import { TagsTableService } from '../../dbTables/tags/tagsTable.service';

@Controller('/pageNotes')
export class PageNotesController {
    constructor(
      private readonly users: UsersTableService,
      private readonly notes: NotesTableService,
      private readonly likes: LikesTableService,
      private readonly tags: TagsTableService,
    ) {}
  @Get()
  @Render('notes')
  async root() {
      return {
      news: 'Тут будут новости',
      addClassNews: 'active',
        notes: await this.notes.findAll(),
    };
  }
}
