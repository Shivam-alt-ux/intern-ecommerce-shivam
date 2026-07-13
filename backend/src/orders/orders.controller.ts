import { Controller, Get, Post, UseGuards, Request } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("orders")
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post("checkout")
  checkout(@Request() req) {
    return this.ordersService.checkout(req.user.userId);
  }

  @Get()
  getOrders(@Request() req) {
    return this.ordersService.getOrders(req.user.userId);
  }
}