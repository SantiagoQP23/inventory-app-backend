import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import type { ProductRepository } from '../../domain/repositories/product.repository.interface';
import { Product } from '../../domain/entities/product.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateProductDto } from '../../interface/dto/create-product.dto';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository, // Replace 'any' with the actual type
  ) {}

  async execute(product: CreateProductDto): Promise<Product> {
    const productExist = await this.productRepository.findOne(product.name);

    if (productExist) {
      throw new BadRequestException('Product already exists');
    }

    const newProduct = new Product(
      uuidv4(),
      product.name,
      product.stockQty,
      product.minStockQty,
    );
    return this.productRepository.create(newProduct);
  }
}
