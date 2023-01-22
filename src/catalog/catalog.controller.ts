import { Controller, Post, Get, Query, Body } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Catalog } from 'src/db-schemas/catalog.schema';
import { CatalogService } from './catalog.service';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { SearchCatalogDto } from './dto/search-catalog.dto';

@ApiTags('Catalog')
@Controller('catalog')
export class CatalogController {
  constructor(private catalogService: CatalogService) {}

  @ApiQuery({
    name: 'category',
    description: 'category values that need to be considered for filter',
  })
  @ApiOperation({ summary: 'Get array Catalog by category' })
  @ApiResponse({ status: 200, type: [Catalog] })
  @Get()
  getCatalog(@Query() dto: SearchCatalogDto) {
    return this.catalogService.getCatalogBy(dto);
  }

  @ApiOperation({ summary: 'Create Catalog' })
  @ApiResponse({ status: 200, type: [Catalog] })
  @Post()
  CreateCatalog(@Body() dto: CreateCatalogDto) {
    return this.catalogService.createCatalog(dto);
  }
}
