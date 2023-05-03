import { PipeTransform, Injectable } from '@nestjs/common';
import { ValidationException } from '../exceptions/validation.exception';

@Injectable()
export class CourseValidationPipe implements PipeTransform {
  transform(value: any) {
    const detailsField = value.details;
    const programField = value.program;
      
    if (!detailsField) throw new ValidationException("where is details field?");
    if (!programField) throw new ValidationException("where is program field?");

    const parsedDetails = JSON.parse(detailsField);
    const parsedProgram = JSON.parse(programField);

    // console.log("parsedDetails:", parsedDetails)
    // console.log("parsedProgram:", parsedProgram)

    return {...value, details: parsedDetails, program: parsedProgram}
  }
}
