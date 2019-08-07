import { Controller, Get, Render, Res, HttpStatus} from '@nestjs/common';
import { AppService } from '../provider/app.service';

@Controller('notes')
export class Notes {

  @Get()
  @Render('notes')
  root() {
    return {news: 'Тут будут новости'}
  }
}