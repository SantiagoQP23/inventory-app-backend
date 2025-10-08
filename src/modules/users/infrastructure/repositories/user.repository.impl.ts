import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository.interface';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { User } from '../../domain/entities/user.entity';
import { Role, UserStore } from '../../domain/entities/user-store.entity';

@Injectable()
export class UserRepositoryImpl extends UserRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }
  async create(user: User): Promise<User> {
    await this.prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        lastname: user.lastName,
        email: user.email,
        password: user.password,
        userStores: { create: [] },
      },
      include: { userStores: true },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { userStores: true },
    });

    if (!user) return null;

    return new User(
      user.id,
      user.name,
      user.lastname,
      user.email,
      user.password,
      user.userStores.map(
        (us) => new UserStore(us.id, us.storeId, us.userId, us.role as Role),
      ),
      user.createdAt,
      user.updatedAt,
    );
  }
}
