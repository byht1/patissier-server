import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiHeaders, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ValidatePipe } from 'src/classValidator';
import { Product } from 'src/db-schemas/product.schema';
import { CreatePictureDto, CreateProductDto, GetAllProductsQueryParams } from './dto';
import { ProductService } from './product.service';
import { CategoryRecordsSwaggerSchema, CreateProductSwaggerSchema, GetAllProductsSchema } from './schema-swagger';

@ApiTags('Product')
@Controller('store/product')
export class ProductController {
  constructor(private readonly storService: ProductService) {}

  @ApiOperation({ summary: 'Add a new product' })
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'User access token.',
    },
  ])
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateProductSwaggerSchema })
  @ApiResponse({ status: 200, type: Product })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 403, description: 'Invalid token' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 2 }]))
  @UsePipes(ValidatePipe)
  @UseGuards(JwtAuthGuard)
  @Post()
  createProduct(@Body() createProductDto: CreateProductDto, @UploadedFiles() file: CreatePictureDto) {
    return this.storService.createProduct(createProductDto, file);
  }

  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, type: GetAllProductsSchema })
  @ApiResponse({ status: 400, description: 'The value of the query parameter is not important' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UsePipes(ValidatePipe)
  @Get()
  getProducts(@Query() getAllProductsQueryParams: GetAllProductsQueryParams) {
    return this.storService.getAllProducts(getAllProductsQueryParams);
  }

  @ApiOperation({ summary: 'Number of each category' })
  @ApiResponse({ status: 200, type: [CategoryRecordsSwaggerSchema] })
  @ApiResponse({ status: 500, description: 'Server error' })
  @Get('category-records')
  countRecordsByCategory() {
    return this.storService.countRecordsByCategory();
  }
}
