import { ApiProperty } from '@nestjs/swagger';

export class CategoryRecordsSwaggerSchema {
  @ApiProperty({ description: 'Значення категорії' })
  readonly _id: string;

  @ApiProperty({ description: 'Кількість продуктів даної категорії' })
  readonly count: number;
}
