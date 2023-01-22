import { ApiProperty } from '@nestjs/swagger';

export class SearchReviewsDto {
  @ApiProperty({
    example: 'курси',
    required: false,
    description: 'String for search Catalog by category',
  })
  readonly category?: string;
}
