import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsNumber } from 'class-validator';

export class CreateCatalogDto {
  @ApiProperty({
    example: 'Торти',
    description: 'Category',
  })
  @IsString({ message: 'Should be text' })
  readonly category: string;

  @ApiProperty({
    example: 'Булка “Равлик”',
    description: 'title',
  })
  @IsString({ message: 'Should be text' })
  readonly title: string;

  @ApiProperty({
    example: 21.5,
    description: 'price',
  })
  @IsNumber()
  readonly price: number;

  @ApiProperty({
    example: 'Ніжний заварний крем та зрусткк печиво...',
    description: 'description',
  })
  @IsString({ message: 'Should be text' })
  readonly description: string;

  @ApiProperty({
    example: 'Склад',
    description: 'ingredients',
  })
  @IsString({ message: 'Should be text' })
  readonly ingredients: string;

  @ApiProperty({
    example: 'true',
    description: 'Is available or not available',
  })
  @IsBoolean({ message: 'Should be boolean' })
  readonly isAvailable: boolean;
}
