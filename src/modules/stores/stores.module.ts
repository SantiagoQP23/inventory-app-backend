import { Module } from '@nestjs/common';
import { StoresController } from './infrastructure/http/stores/stores.controller';

@Module({
  controllers: [StoresController]
})
export class StoresModule {}
