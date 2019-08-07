import { Controller, Get} from '@nestjs/common';
import { AppService } from '../provider/app.service';

@Controller()
export class Main {
    @Get()
    findAll(): string {
        return 'main';
    }
}