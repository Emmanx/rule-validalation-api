import { Body, Controller, Post } from '@nestjs/common';
import { IResponse } from 'src/types/response';
import { ValidationDataDto } from './validation.dto';
import { ValidationService } from './validation.service';

@Controller('validate-rule')
export class ValidationController {
  constructor(private readonly validationService: ValidationService) {}

  @Post()
  validateRule(@Body() validationData: ValidationDataDto): IResponse {
    return this.validationService.validateRule(validationData);
  }
}
