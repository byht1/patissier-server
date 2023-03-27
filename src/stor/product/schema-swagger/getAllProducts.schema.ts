import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/db-schemas/product.schema';

export class GetAllProductsSchema {
  @ApiProperty({ type: [Product] })
  readonly products: Product[];

  @ApiProperty({ description: 'Загальна кількість продуктів' })
  readonly limit: number;
}
