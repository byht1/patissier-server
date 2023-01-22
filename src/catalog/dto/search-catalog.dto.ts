import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SearchCatalogDto {
  @ApiProperty({
    example: 'all',
    description: 'String for search Catalog by category',
  })
  @IsString({ message: 'Should be text' })
  readonly category: string;
  @ApiProperty({
    example: '1',
    required: false,
    default: 1,
    description: 'Page for Catalog',
  })
  readonly page: '1';

  @ApiProperty({
    example: '9',
    required: false,
    default: 9,
    description: 'Limit Catalog on one page',
  })
  readonly limit: '9';
}
