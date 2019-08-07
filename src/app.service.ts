import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(param): string {
    return param;
  }
}
