import { Controller, Get, Render, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('/register')
export class Register {
  @Get()
  @Render('register')
  findAll(@Res() response: Response) {
    return response.status(200);
  }
}
