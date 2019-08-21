import { Controller, Get, Render, Res, Post, UseGuards, Req, Body } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { loginDto } from '../dto/login.dto';

@Controller()
export class Login {
  @Get('/login')
  @Render('login')
  findAll(@Res() res) {
    return res.status(200);
  }
  @Post('/api/v2/login')
  login(@Req() req, @Body() login: loginDto): string {
    console.log(req.body);
    req.login(req.body, (error) => {
      if (error) {
        throw error;
      }
    });

    return 'ok';
  }
}
