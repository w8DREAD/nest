import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Serializer extends PassportSerializer {
  serializeUser(user: any, done: Function): any {
    console.log('serializeUser', { user });
    done(null, user);
  }

  deserializeUser(payload: any, done: Function): any {
    console.log('deserializeUser', { payload });
    done(null, payload);
  }
}
