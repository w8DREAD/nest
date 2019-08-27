import { Controller, Get, Render, Res, Post, UseGuards, Req, Body, Session } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';

import { LoginGuard } from '../../auth/guards/login.guard';
import { AuthenticatedGuard } from '../../auth/guards/authenticated.guard';

@Controller()
export class LoginController {
  constructor(private readonly authService: AuthService) {}
  @Get('/login')
  @Render('login')
  findAll(@Res() res) {
    return res.status(200);
  }
  @UseGuards(LoginGuard)
  @Post('/api/v2/login')
  async login(@Res() res, @Req() req) {
    res.redirect('/');
  }
  @UseGuards(AuthenticatedGuard)
  @Get('me')
  getProfile(@Req() req) {
    return req.user;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/logout')
  async logout(@Req() req, @Res() res) {
    console.log(await req.logout());
    res.redirect('/');
  }
}
