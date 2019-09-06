import { Controller, Get, Render, Req, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '../../auth/guards/authenticated.guard';

@Controller('/addNote')
export class AddNoteController {
    @UseGuards(AuthenticatedGuard)
    @Get()
    @Render('addNote')
    root(@Req() req) {
        return {
            login: true,
            // like: await control.Like.takeRedis(`${req.user.email}`),
            like: 0,
            username: req.session.passport.user.username,
        };
    }
}
