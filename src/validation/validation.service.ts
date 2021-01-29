import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { StatusTypes, IResponse } from '../types/response';
import { Conditions, ValidationDataDto } from './validation.dto';

@Injectable()
export class ValidationService {
  private accessValueByString(data, path) {
    try {
      path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
      path = path.replace(/^\./, ''); // strip a leading dot
      const pathsArr = path.split('.');
      for (let i = 0; i < pathsArr.length; ++i) {
        const item = pathsArr[i];
        if (item in data) {
          data = data[item];
        } else {
          throw new BadRequestException(`field ${path} does not exist in data`);
        }
      }
      return data;
    } catch (error) {
      throw new BadRequestException(`field ${path} does not exist in data`);
    }
  }

  private validate(data, condition, value) {
    switch (condition) {
      case Conditions.CONTAINS:
        return data.includes(value);
      case Conditions.GT:
        return data > value;
      case Conditions.GTE:
        return data >= value;
      case Conditions.NEQ:
        return data !== value;
      case Conditions.EQ:
        return data === value;
      default:
        throw new BadRequestException(`${condition} is not a valid condition`);
    }
  }

  validateRule(validationData: ValidationDataDto): IResponse {
    const { data, rule } = validationData;
    let value;

    if (typeof data === 'object') {
      const nestingLevel = (rule.field.match(/\./g) || []).length;

      if (nestingLevel > 2)
        throw new BadRequestException(
          'can only access nested values 2 level deep',
        );

      value = this.accessValueByString(data, rule.field);
    } else if (typeof data === 'string') {
      value = data[rule.field];
    } else {
      throw new HttpException(
        {
          status: StatusTypes.ERROR,
          message: 'data should be of type object, array or string',
          data: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const isValid = this.validate(
      value,
      validationData.rule.condition,
      validationData.rule.condition_value,
    );

    if (!isValid) {
      throw new HttpException(
        {
          message: `field ${rule.field} failed validation`,
          status: StatusTypes.ERROR,
          data: {
            validation: {
              error: true,
              field: rule.field,
              field_value: value,
              condition: rule.condition,
              condition_value: rule.condition_value,
            },
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      message: `field ${rule.field} successfully validated.`,
      status: StatusTypes.SUCCESS,
      data: {
        validation: {
          error: false,
          field: rule.field,
          field_value: value,
          condition: rule.condition,
          condition_value: rule.condition_value,
        },
      },
    };
  }
}
