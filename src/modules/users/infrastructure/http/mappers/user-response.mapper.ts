import { User } from 'src/modules/users/domain/entities/user.entity';

export class UserResponseMapper {
  static toResponse(user: User) {
    return {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
