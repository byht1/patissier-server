import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiHeaders, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ValidatePipe } from 'src/classValidator';
import { Product } from 'src/db-schemas/product.schema';
import {
  CreatePictureDto,
  CreateProductDto,
  EActionFavorite,
  FavoriteQueryDto,
  GetAllProductsQueryParams,
} from './dto';
import { ProductService } from './services/product.service';
import {
  CategoryRecordsSwaggerSchema,
  CreateProductSwaggerSchema,
  Favorite,
  GetAllProductsSchema,
} from './schema-swagger';
import { IReqUser } from 'src/type';
import { ProductFavoriteService } from './services/product-favorite.service';

@ApiTags('Product')
@Controller('store/product')
export class ProductController {
  constructor(private storService: ProductService, private productFavoriteService: ProductFavoriteService) {}

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
  @ApiResponse({ status: 201, type: Product })
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
  @ApiResponse({ status: 201, type: GetAllProductsSchema })
  @ApiResponse({ status: 400, description: 'The value of the query parameter is not important' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UsePipes(ValidatePipe)
  @Get()
  getProducts(@Query() getAllProductsQueryParams: GetAllProductsQueryParams) {
    return this.storService.getAllProducts(getAllProductsQueryParams);
  }

  @ApiOperation({ summary: 'Number of products in this category' })
  @ApiResponse({ status: 201, type: [CategoryRecordsSwaggerSchema] })
  @ApiResponse({ status: 500, description: 'Server error' })
  @Get('category-records')
  countRecordsByCategory() {
    return this.storService.countRecordsByCategory();
  }

  @ApiOperation({ summary: 'Add or delete to favorites' })
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'User access token.',
    },
  ])
  @ApiResponse({ status: 201, type: Favorite })
  @ApiResponse({ status: 403, description: 'Invalid token' })
  @ApiResponse({ status: 404, description: 'Product with ID ${productId} not found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @Patch('favorite/:productId')
  deleteFavorite(@Param('productId') productId: ObjectId, @Req() req: IReqUser, @Query() { action }: FavoriteQueryDto) {
    if (action === EActionFavorite.DELETE) {
      return this.productFavoriteService.deleteToFavorite(req.user._id, productId);
    }

    return this.productFavoriteService.addToFavorite(req.user._id, productId);
  }

  @ApiOperation({ summary: 'User favorites' })
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'User access token.',
    },
  ])
  @ApiResponse({ status: 201, type: Favorite })
  @ApiResponse({ status: 403, description: 'Invalid token' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @Get('favorites')
  userFavorite(@Req() req: IReqUser) {
    return this.productFavoriteService.userToFavorite(req.user._id);
  }
}
