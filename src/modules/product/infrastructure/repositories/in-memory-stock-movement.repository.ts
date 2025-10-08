import { Injectable } from '@nestjs/common';
import { StockMovementRepository } from '../../domain/repositories/stock-movement.repository.interface';
import { StockMovement } from '../../domain/entities/stock-movement.entity';

@Injectable()
export class InMemoryStockMovementRepository
  implements StockMovementRepository
{
  private stockMovements: StockMovement[] = [];
  async findByProductId(productId: string): Promise<StockMovement[]> {
    await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate network delay
    return this.stockMovements.filter(
      (movement) => movement.productId === productId,
    );
  }
  async save(stockMovement: StockMovement): Promise<StockMovement> {
    this.stockMovements.push(stockMovement);
    await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate network delay
    return stockMovement;
  }
}
