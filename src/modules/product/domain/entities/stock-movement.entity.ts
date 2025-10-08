export class StockMovement {
  constructor(
    public id: string,
    public productId: string,
    public amount: number,
    public type: 'IN' | 'OUT',
    public createdAt: Date = new Date(),
  ) {}
}
