import { Controller, Post, Body, Res, Req, UseGuards } from '@nestjs/common';
import { NotesTableService } from '../../dbTables/notes/notesTable.service';
import { AddNotesDto } from '../../dto/notes.dto';
import { AuthenticatedGuard } from '../../auth/guards/authenticated.guard';

@Controller('/api/v2/notes')
export class NotesController {
  constructor(private readonly notes: NotesTableService) {}
  @UseGuards(AuthenticatedGuard)
@Post()
async add(@Body() addNotesDto: AddNotesDto, @Res() res, @Req() req) {
    addNotesDto.user_id = req.session.passport.user.id;
    addNotesDto.com_count = 0;
    await this.notes.save(addNotesDto);
    res.redirect('/');
  }
}
