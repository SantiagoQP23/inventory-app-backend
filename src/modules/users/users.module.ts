import { Module } from '@nestjs/common';
import { UsersController } from './infrastructure/http/users/users.controller';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { UserRepository } from './domain/repositories/user.repository.interface';
import { UserRepositoryImpl } from './infrastructure/repositories/user.repository.impl';

@Module({
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [CreateUserUseCase, UserRepository],
})
export class UsersModule {}
