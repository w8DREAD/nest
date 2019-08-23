import { Controller, Get, Render } from '@nestjs/common';

@Controller('/logs')
export class LogsController {
  @Get()
  @Render('logs')
  root() {
    return {news: 'Логи',
      addClassLogs: 'active'};
  }
}