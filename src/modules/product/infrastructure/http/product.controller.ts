import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetAllProductsUseCase } from '../../application/use-cases/get-all-products.use-case';
import { CreateProductUseCase } from '../../application/use-cases/create-product.user-case';
import { CreateProductDto } from '../../interface/dto/create-product.dto';
import { Product } from '../../domain/entities/product.entity';
import { AddStockUseCase } from '../../application/use-cases/add-stock.use-case';
import { AccessGuard } from 'src/infrastructure/guards/access.guard';
import { Access } from 'src/infrastructure/decorators/access.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('products')
@UseGuards(AuthGuard('jwt'), AccessGuard)
export class ProductController {
  constructor(
    private readonly getAllProductsUseCase: GetAllProductsUseCase, // Replace 'any' with the actual type
    private readonly createProductUseCase: CreateProductUseCase, // Replace 'any' with the actual type
    private readonly addStockUseCase: AddStockUseCase, // Replace 'any' with the actual type
  ) {}

  @Get()
  async getAll() {
    return this.getAllProductsUseCase.execute();
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.createProductUseCase.execute(createProductDto);
  }

  @Patch(':id/add-stock')
  async addStock(@Param('id') id: string, @Body('quantity') quantity: number) {
    return this.addStockUseCase.execute(id, quantity);
  }
}
