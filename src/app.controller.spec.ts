import { Test, TestingModule } from '@nestjs/testing';
import { Notes } from './controllers/notes';
import { AppService } from './provider/app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [Notes],
      providers: [AppService],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get<Notes>(Notes);
      expect(appController.getHello('param')).toBe('Hello World!');
    });
  });
});
