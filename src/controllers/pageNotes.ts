import { Controller, Get, Render, Res, HttpStatus} from '@nestjs/common';

@Controller('/pageNotes')
export class PageNotes {

  @Get()
  @Render('notes')
  root() {
    return {news: 'Тут будут новости',
      addClassNews: 'active'};
  }
}
