import { Type } from 'class-transformer';
import { IsString, IsIn, IsNotEmpty, ValidateNested } from 'class-validator';

export enum Conditions {
  GTE = 'gte',
  GT = 'gt',
  CONTAINS = 'contains',
  EQ = 'eq',
  NEQ = 'neq',
}

export class RuleParams {
  @IsString()
  field: string;

  @IsString()
  @IsIn(['eq', 'neq', 'gt', 'gte', 'contains'])
  condition: Conditions;

  @IsNotEmpty()
  condition_value: string | number;
}

export class ValidationDataDto {
  @IsNotEmpty()
  @ValidateNested({ message: 'Rule should be an object' })
  @Type(() => RuleParams)
  rule: RuleParams;

  @IsNotEmpty()
  data: any;
}
