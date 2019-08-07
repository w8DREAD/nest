import { Controller, Get, Post, HttpCode, Body} from '@nestjs/common';
import { AppService } from '../provider/app.service';
import { addNotesDto } from '../dto/notes.dto';

@Controller('addNotes')
export class addNotes {

    @Get()
    findOne(): string {
        return `notes with`;
    }
    @Post()
    @HttpCode(204)
    create(@Body() addNotesDto: addNotesDto) {
        return 'This action adds a new cat';
    }
    findAll(): string {
        return `All notes`;
    }
}