import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ApplicationModule } from './app.module';
import { join } from 'path';
import * as hbs from 'hbs';
import * as passport from 'passport';
import * as session from 'express-session';
import * as Store from 'session-file-store';

async function server() {
  const app = await NestFactory.create<NestExpressApplication>(ApplicationModule);
  app.useStaticAssets(join(__dirname, '..', '/public'));

  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', '/partials'));
  app.use(passport.initialize());
  app.use(session({
    secret: 'secretWord4ProjectNotes',
    name: 'sessionProjectNotes',
    store: new Store(session)(),
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 1000 * 60 * 30,
    },
    resave: false,
    saveUninitialized: false,
  }));
  await app.listen(3000);
}
server();
