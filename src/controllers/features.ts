import { Controller, Get, Render } from '@nestjs/common';

@Controller('/features')
export class Features {
  @Get()
  @Render('features')
  root() {
    return {news: 'Фичи',
      addClassFeatures: 'active'};
  }
}