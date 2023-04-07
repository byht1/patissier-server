import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards, UsePipes } from '@nestjs/common';
import { ApiHeaders, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ValidatePipe } from 'src/classValidator';
import { Orders } from 'src/db-schemas/orders.schema';
import { IReqUser } from 'src/type';
import { BasketQueryParams, CreateOrderDto } from './dto';
import { Basket } from './schema-swagger';
import { OrderBasketService } from './services/order-basket.service';
import { OrderService } from './services/order.service';

@ApiTags('Order')
@Controller('store/order')
export class OrderController {
  constructor(private orderService: OrderService, private orderBasketService: OrderBasketService) {}

  @ApiOperation({ summary: 'Add a new order' })
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'User access token.',
    },
  ])
  @ApiResponse({ status: 201, type: Orders })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 403, description: 'Invalid token' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UsePipes(ValidatePipe)
  @UseGuards(JwtAuthGuard)
  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto, @Req() req: IReqUser) {
    return this.orderService.createOrder(createOrderDto, req.user._id);
  }

  @ApiOperation({ summary: 'Add product to basket' })
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'User access token.',
    },
  ])
  @ApiResponse({ status: 201, type: Basket })
  @ApiResponse({ status: 403, description: 'Invalid token' })
  @ApiResponse({ status: 404, description: 'Product with ID ${productId} not found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UsePipes(ValidatePipe)
  @UseGuards(JwtAuthGuard)
  @Get('add-basket/:productId')
  addToBasket(
    @Param('productId') productId: ObjectId,
    @Req() req: IReqUser,
    @Query() basketQueryParams: BasketQueryParams,
  ) {
    return this.orderBasketService.addToBasket(req.user._id, productId, basketQueryParams);
  }

  @ApiOperation({ summary: 'Delete product from basket' })
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'User access token.',
    },
  ])
  @ApiResponse({ status: 200, type: Basket, description: 'Product deleted from basket' })
  @ApiResponse({ status: 403, description: 'Invalid token' })
  @ApiResponse({ status: 404, description: 'Invalid data' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UsePipes(ValidatePipe)
  @UseGuards(JwtAuthGuard)
  @Delete('basket/:productId')
  deleteFromBasket(
    @Param('productId') productId: ObjectId,
    @Req() req: IReqUser,
    @Query() basketQueryParams: BasketQueryParams,
  ) {
    return this.orderBasketService.deleteToBasket(req.user._id, productId, basketQueryParams);
  }

  @ApiOperation({ summary: 'Get user basket' })
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'User access token.',
    },
  ])
  @ApiResponse({ status: 200, type: Basket, description: 'Ok' })
  @ApiResponse({ status: 403, description: 'Invalid token' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UsePipes(ValidatePipe)
  @UseGuards(JwtAuthGuard)
  @Get('user-basket')
  getUserBasket(@Req() req: IReqUser, @Query() basketQueryParams: BasketQueryParams) {
    return this.orderBasketService.allBasketId(req.user._id, basketQueryParams);
  }
}
