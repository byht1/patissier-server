import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SearchCatalogDto {
  @ApiProperty({
    example: 'all',
    description: 'String for search Catalog by category',
  })
  @IsString({ message: 'Should be text' })
  readonly category: string;
}
