import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, UseGuards, Request } from "@nestjs/common";
import { CartService } from "./cart.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { AddItemDto } from "./dto/add-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";

@Controller("cart")
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  getCart(@Request() req) {
    return this.cartService.getCart(req.user.userId);
  }

  @Post("items")
  addItem(@Request() req, @Body() dto: AddItemDto) {
    return this.cartService.addItem(req.user.userId, dto.productId, dto.quantity);
  }

  @Patch("items/:productId")
  updateItem(
    @Request() req,
    @Param("productId", ParseIntPipe) productId: number,
    @Body() dto: UpdateItemDto,
  ) {
    return this.cartService.updateItem(req.user.userId, productId, dto.quantity);
  }

  @Delete("items/:productId")
  removeItem(@Request() req, @Param("productId", ParseIntPipe) productId: number) {
    return this.cartService.removeItem(req.user.userId, productId);
  }
}