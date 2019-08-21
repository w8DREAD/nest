import { Controller, Post, Body, Res, Req } from '@nestjs/common';
import { Response } from 'express';
import { Request } from 'express';
import { addNotesDto } from '../dto/notes.dto';
import { NoteService } from '../provider/note.service';

@Controller('/api/v2/notes')
export class Notes {
  constructor(private readonly noteService: NoteService) {}
@Post()
create(
  @Body() createNoteDto: addNotesDto,
  @Res() res: Response,
  @Req() req: Request) {
    console.log(this.noteService.create(createNoteDto));
    res.redirect('/');
  }
}
