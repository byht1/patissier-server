import { BadRequestException } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ async: true })
export class EndLaterThanStartRule implements ValidatorConstraintInterface {
  validate(date: Date, args: ValidationArguments) {
    const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
    const timeRexex = /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/;

    if (dateRegex.test(date.toString())) {
      if (date < args.object['startDate']) {
        throw new BadRequestException('endDate should be equal to or later than startDate');
      }
    }

    if (timeRexex.test(date.toString())) {
      if (date < args.object['from']) {
        throw new BadRequestException('to should be later than from');
      }
    }

    return true;
  }
}
