import { Test, TestingModule } from '@nestjs/testing';
import { ValidationController } from './validation.controller';
import { Conditions } from './validation.dto';
import { ValidationService } from './validation.service';

describe('ValidationController', () => {
  let validationController: ValidationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValidationController],
      providers: [ValidationService],
    }).compile();

    validationController = module.get<ValidationController>(
      ValidationController,
    );
  });

  const successConditionPayload = {
    rule: {
      field: 'missions.count',
      condition: Conditions.GTE,
      condition_value: 30,
    },
    data: {
      name: 'James Holden',
      crew: 'Rocinante',
      age: 34,
      position: 'Captain',
      missions: {
        count: 45,
        successful: 44,
        failed: 1,
      },
    },
  };

  const expectedValidResponse = {
    message: 'field missions.count successfully validated.',
    status: 'success',
    data: {
      validation: {
        error: false,
        field: 'missions.count',
        field_value: 45,
        condition: 'gte',
        condition_value: 30,
      },
    },
  };

  it('should be valid', () => {
    expect(
      validationController.validateRule(successConditionPayload).toString(),
    ).toBe(expectedValidResponse.toString());
  });
});
