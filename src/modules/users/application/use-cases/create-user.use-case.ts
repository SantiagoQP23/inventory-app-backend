import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository.interface';
import { User } from '../../domain/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../../interface/dto/create-user.dto';

@Injectable()
export class CreateUserUseCase {
  private readonly logger = new Logger(CreateUserUseCase.name, {
    timestamp: true,
  });

  constructor(private readonly userRepository: UserRepository) {}
  async execute(dto: CreateUserDto) {
    this.logger.log(`Creating user with email: ${dto.email}`);
    const userExist = await this.userRepository.findByEmail(dto.email);

    if (userExist) {
      throw new BadRequestException('User already exists');
    }

    const user = new User(
      uuidv4(),
      dto.name,
      dto.lastName,
      dto.email,
      dto.password,
      [],
      new Date(),
      new Date(),
    );

    const newUser = await this.userRepository.create(user);

    return newUser;
  }
}
