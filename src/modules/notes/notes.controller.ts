import { Controller, Post, Body, Res, Req, UseGuards, Delete, Param, Put } from '@nestjs/common';
import { NotesTableService } from '../../dbTables/notes/notesTable.service';
import {LikesTableService} from '../../dbTables/likes/likesTable.service';
import { AddNotesDto } from '../../dto/notes.dto';
import { AuthenticatedGuard } from '../../auth/guards/authenticated.guard';
import { NotesService } from './notes.service';

@Controller('/api/v2/notes')
export class NotesController {
  constructor(
    private readonly notes: NotesTableService,
    private readonly likes: LikesTableService,
    private readonly redis: NotesService,
    ) {}
  @UseGuards(AuthenticatedGuard)
  @Post()
  async add(@Body() addNotesDto: AddNotesDto, @Res() res, @Req() req) {
    addNotesDto.user = req.session.passport.user.id;
    addNotesDto.com_count = 0;
    await this.notes.save(addNotesDto);
    res.redirect('/');
  }

  @Post(':id/likes')
  async like(@Res() res, @Req() req, @Param('id') id: number) {
    const userId = 1;
    const noteId = Number(id);
    const existLike = await this.likes.findAll(userId, noteId);
    console.log(existLike)
    if (existLike) {
    await this.likes.remove(userId, noteId);
    } else {
      await this.likes.save(userId, noteId);
      console.log(await this.likes.findAllLikesUser(noteId))
    }
    res.sendStatus(202);
  }

  @Put(':id')
  async edit(@Req() req, @Res() res, @Param('id') id: number) {
    const {text} = req.body;
    await this.notes.edit(id, text);
    res.sendStatus(202);
  }

  @Delete(':id')
  async remove(@Res() res, @Param('id') id: number) {
    await this.notes.remove(id);
    res.sendStatus(202);
  }
}
