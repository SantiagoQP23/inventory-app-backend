import { StockMovement } from '../entities/stock-movement.entity';

export interface StockMovementRepository {
  save(movement: StockMovement): Promise<StockMovement>;
  findByProductId(productId: string): Promise<StockMovement[]>;
}
