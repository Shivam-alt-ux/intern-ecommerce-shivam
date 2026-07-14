import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AddItemDto } from './dto/add-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import type { AuthenticatedRequest } from '../auth/types/authenticated-request.interface';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  getCart(@Req() req: AuthenticatedRequest) {
    return this.cartService.getCart(req.user.userId);
  }

  @Post('items')
  addItem(@Req() req: AuthenticatedRequest, @Body() dto: AddItemDto) {
    return this.cartService.addItem(
      req.user.userId,
      dto.productId,
      dto.quantity,
    );
  }

  @Patch('items/:productId')
  updateItem(
    @Req() req: AuthenticatedRequest,
    @Param('productId', ParseIntPipe) productId: number,
    @Body() dto: UpdateItemDto,
  ) {
    return this.cartService.updateItem(
      req.user.userId,
      productId,
      dto.quantity,
    );
  }

  @Delete('items/:productId')
  removeItem(
    @Req() req: AuthenticatedRequest,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.cartService.removeItem(req.user.userId, productId);
  }
}
