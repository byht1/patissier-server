import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/db-schemas/product.schema';

export class Favorite {
  @ApiProperty({ example: ['6373c0bca5a6e4c9556f1e7a', '6373c0bca5a6e4c9556f1e7a'] })
  favorites: Product[];
}
