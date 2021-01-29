import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatusTypes } from './types/response';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      const res = {
        message: 'My Rule-Validation API',
        status: StatusTypes.SUCCESS,
        data: {
          name: 'Aneri Azibayam Emmanuel',
          github: '@emmanx',
          email: 'aneriemmax@gmail.com',
          mobile: '08100921328',
          twitter: '@emmaxcodes',
        },
      };

      expect(appController.getProfile().toString()).toBe(res.toString());
    });
  });
});
