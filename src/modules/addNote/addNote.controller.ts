import { Controller, Get, Render } from '@nestjs/common';

@Controller('/addNote')
export class AddNoteController {
    @Get()
    @Render('addNote')
    root() {
        return {};
    }
}