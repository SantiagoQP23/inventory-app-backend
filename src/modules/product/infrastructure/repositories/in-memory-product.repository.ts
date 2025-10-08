import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories/product.repository.interface';
import { Product } from '../../domain/entities/product.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class InMemoryProductRepository implements ProductRepository {
  private products: Product[] = [
    new Product(uuidv4(), 'Sample Product', 100, 10),
  ];

  async findAll(): Promise<Product[]> {
    await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate network delay
    return this.products;
  }

  async create(product: Product): Promise<Product> {
    this.products.push(product);
    await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate network delay
    return product;
  }

  async findOne(search: string): Promise<Product | null> {
    const product = this.products.find(
      (p) => p.id === search || p.name.toLowerCase() === search.toLowerCase(),
    );
    await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate network delay
    return product || null;
  }

  async update(product: Product): Promise<Product> {
    const index = this.products.findIndex((p) => p.id === product.id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    this.products[index] = product;
    await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate network delay
    return product;
  }
}
