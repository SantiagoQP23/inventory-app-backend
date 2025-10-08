import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository.interface';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class UserInMemoryRepository extends UserRepository {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate network delay
    return this.users.find((u) => u.email === email) || null;
  }

  async create(user: User): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate network delay
    this.users.push(user);
    return user;
  }
}
