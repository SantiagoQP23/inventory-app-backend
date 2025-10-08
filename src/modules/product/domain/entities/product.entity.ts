export class Product {
  constructor(
    public id: string,
    public name: string,
    public stockQty: number,
    public minStockQty: number,
  ) {}

  addStock(quantity: number) {
    if (quantity <= 0) {
      throw new Error('Quantity to add must be greater than zero.');
    }
    this.stockQty += quantity;
  }
}
