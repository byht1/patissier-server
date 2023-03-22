import { Body, Controller, Post, Req, UseGuards, UsePipes } from '@nestjs/common';
import { ApiHeaders, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ValidatePipe } from 'src/classValidator';
import { Orders } from 'src/db-schemas/orders.schema';
import { IReqUser } from 'src/type';
import { CreateOrderDto } from './dto';
import { OrderService } from './order.service';

@ApiTags('Order')
@Controller('stor/order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @ApiOperation({ summary: 'Add a new product' })
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'User access token.',
    },
  ])
  @ApiResponse({ status: 200, type: Orders })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 403, description: 'Invalid token' })
  @ApiResponse({ status: 500, description: 'Server error' })
  @UsePipes(ValidatePipe)
  @UseGuards(JwtAuthGuard)
  @Post('create')
  createOrders(@Body() createOrderDto: CreateOrderDto, @Req() req: IReqUser) {
    return this.orderService.createOrder(createOrderDto, req.user._id);
  }
}
