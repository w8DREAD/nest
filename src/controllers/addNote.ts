import { Controller, Get, Render } from '@nestjs/common';

@Controller('/addNote')
export class AddNote {
    @Get()
    @Render('addNote')
    root() {
        return {};
    }
}