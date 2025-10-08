import { Module } from '@nestjs/common';
import { ProductController } from './infrastructure/http/product.controller';
import { CreateProductService } from './application/use-cases/create-product/create-product.service';
import { GetAllProductsUseCase } from './application/use-cases/get-all-products.use-case';
import { InMemoryProductRepository } from './infrastructure/repositories/in-memory-product.repository';
import { CreateProductUseCase } from './application/use-cases/create-product.user-case';
import { AddStockUseCase } from './application/use-cases/add-stock.use-case';
import { InMemoryStockMovementRepository } from './infrastructure/repositories/in-memory-stock-movement.repository';

@Module({
  controllers: [ProductController],
  providers: [
    CreateProductService,
    GetAllProductsUseCase,
    CreateProductUseCase,
    AddStockUseCase,
    { provide: 'ProductRepository', useClass: InMemoryProductRepository },
    {
      provide: 'StockMovementRepository',
      useClass: InMemoryStockMovementRepository,
    },
  ],
})
export class ProductModule {}
