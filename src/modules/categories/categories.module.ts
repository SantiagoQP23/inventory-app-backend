import { Module } from '@nestjs/common';
import { CategoriesController } from './infrastructure/http/categories/categories.controller';

@Module({
  controllers: [CategoriesController]
})
export class CategoriesModule {}
