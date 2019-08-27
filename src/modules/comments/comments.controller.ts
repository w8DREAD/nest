import { Controller, Post, Res, UseGuards, Body } from '@nestjs/common';
import { AuthenticatedGuard } from '../../auth/guards/authenticated.guard';
import { CommentsTableService } from '../../dbTables/comments/commentsTable.service';

@Controller('/api/v2')
export class CommentsController {
  constructor(private readonly comments: CommentsTableService) {}
  @UseGuards(AuthenticatedGuard)
  @Post()
  add(@Res() res) {
    return {news: 'Главная',
      addClassMain: 'active'};
  }
}
