import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IResponse } from './types/response';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getProfile(): IResponse {
    return this.appService.getProfile();
  }
}
