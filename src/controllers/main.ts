import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class Main {
    @Get()
    @Render('main')
    root() {
        return {news: 'Главная',
            addClassMain: 'active'};
    }
}