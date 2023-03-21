import { ApiProperty } from '@nestjs/swagger';

export class CategoryRecordsSwaggerSchema {
  @ApiProperty({ description: 'Значення категорії' })
  readonly _id: string;

  @ApiProperty({ description: 'Кількість записів згідно категорії' })
  readonly count: number;
}
