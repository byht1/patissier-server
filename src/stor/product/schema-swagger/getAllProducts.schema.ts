import { ApiProperty } from '@nestjs/swagger';
import { Store } from 'src/db-schemas/store.schema';

export class GetAllProductsSchema {
  @ApiProperty({ type: [Store] })
  readonly products: Store[];

  @ApiProperty({ description: 'Загальна кількість продуктів' })
  readonly limit: number;
}
