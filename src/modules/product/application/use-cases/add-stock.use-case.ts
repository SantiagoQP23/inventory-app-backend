import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { ProductRepository } from '../../domain/repositories/product.repository.interface';
import type { StockMovementRepository } from '../../domain/repositories/stock-movement.repository.interface';
import { StockMovement } from '../../domain/entities/stock-movement.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AddStockUseCase {
  constructor(
    @Inject('ProductRepository')
    private productRepository: ProductRepository,

    @Inject('StockMovementRepository')
    private stockMovementRepository: StockMovementRepository,
  ) {}

  async execute(productId: string, quantity: number): Promise<void> {
    const product = await this.productRepository.findOne(productId);
    if (!product) {
      throw new NotFoundException('Product not found.');
    }
    product.addStock(quantity);
    await this.productRepository.update(product);

    const movement = new StockMovement(
      uuidv4(),
      productId,
      quantity,
      'IN',
      new Date(),
    );

    await this.stockMovementRepository.save(movement);
  }
}
