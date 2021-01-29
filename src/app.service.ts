import { Injectable } from '@nestjs/common';
import { IResponse, StatusTypes } from './types/response';

@Injectable()
export class AppService {
  getProfile(): IResponse {
    return {
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
  }
}
