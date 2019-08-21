import { Controller, Get, Render, Res, Post, UseGuards, Req, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { loginDto } from '../dto/login.dto';

@Controller()
export class Login {
  // @Get('/login')
  // @Render('login')
  // findAll(@Res() res) {
  //   return res.status(200);
  // }
  @Post('/api/v2/login')
  async login(@Req() req) {
    return req.user;
  }
}
