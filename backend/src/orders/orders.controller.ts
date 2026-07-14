import { Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { AuthenticatedRequest } from '../auth/types/authenticated-request.interface';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post('checkout')
  checkout(@Req() req: AuthenticatedRequest) {
    return this.ordersService.checkout(req.user.userId);
  }

  @Get()
  getOrders(@Req() req: AuthenticatedRequest) {
    return this.ordersService.getOrders(req.user.userId);
  }
}
