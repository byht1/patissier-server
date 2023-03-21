import { Body, Controller, Post, Req, UseGuards, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ValidatePipe } from 'src/classValidator';
import { IReqUser } from 'src/type';
import { CreateOrderDto } from './dto';
import { OrderService } from './order.service';

@ApiTags('Order')
@Controller('stor/order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UsePipes(ValidatePipe)
  @UseGuards(JwtAuthGuard)
  @Post('create')
  createOrders(@Body() createOrderDto: CreateOrderDto, @Req() req: IReqUser) {
    return this.orderService.createOrder(createOrderDto, req.user._id);
  }
}
