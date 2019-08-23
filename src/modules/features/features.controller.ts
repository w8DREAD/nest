import { Controller, Get, Render } from '@nestjs/common';

@Controller('/features')
export class FeaturesController {
  @Get()
  @Render('features')
  root() {
    return {news: 'Фичи',
      addClassFeatures: 'active'};
  }
}