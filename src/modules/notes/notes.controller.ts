import { Controller, Post, Body, Res, Req } from '@nestjs/common';
import { Response } from 'express';
import { Request } from 'express';
import { addNotesDto } from '../../dto/notes.dto';
// import { PageNotesService } from '../pageNotes/pageNotes.service';

@Controller('/api/v2/notes')
export class NotesController {
//   constructor(private readonly noteService: PageNotesService) {}
// @Post()
// create(
//   @Body() createNoteDto: addNotesDto,
//   @Res() res: Response,
//   @Req() req: Request) {
//     console.log(this.noteService.findAll());
//     res.redirect('/');
//   }
}
