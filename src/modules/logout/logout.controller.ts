import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('/logout')
export class LogoutController {
  @Get()
  findAll(@Res() response: Response) {
    return response.status(200);
  }
}