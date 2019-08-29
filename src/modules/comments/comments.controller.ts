import { Controller, Post, Res, UseGuards, Body, Req, Delete, Param } from '@nestjs/common';
import { AuthenticatedGuard } from '../../auth/guards/authenticated.guard';
import { CommentsTableService } from '../../dbTables/comments/commentsTable.service';
import { AddCommentsDto } from '../../dto/comments.dto';

@Controller('/api/v2/comments')
export class CommentsController {
  constructor(private readonly comments: CommentsTableService) {}
  @Post()
  async add(@Body() addCommentsDto: AddCommentsDto, @Res() res, @Req() req) {
    addCommentsDto.user = req.session.passport.user.id;
    await this.comments.save(addCommentsDto);
    res.sendStatus(202);
  }

  @Delete(':id')
  async remove(@Res() res, @Param('id') id: number) {
    await this.comments.remove(id);
    res.sendStatus(202);
  }
}
