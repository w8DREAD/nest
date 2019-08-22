import { Controller, Get, Render, Res, Post, UseGuards, Req, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';

@Controller()
export class Login {
  constructor(private readonly authService: AuthService) {}
  @Get('/login')
  @Render('login')
  findAll(@Res() res) {
    return res.status(200);
  }
  @UseGuards(AuthGuard('local'))
  @Post('/api/v2/login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Req() req) {
    return req.user;
  }
}
