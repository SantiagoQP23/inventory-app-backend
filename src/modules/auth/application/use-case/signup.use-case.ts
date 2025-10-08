import { CreateUserUseCase } from 'src/modules/users/application/use-cases/create-user.use-case';
import { SignupDto } from '../../interface/dto/signup.dto';
import { Injectable } from '@nestjs/common';
import { BcryptService } from '../../infrastructure/encryption/bcrypt.service';
import { UserResponseMapper } from 'src/modules/users/infrastructure/http/mappers/user-response.mapper';

@Injectable()
export class SignUpUseCase {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly bcryptService: BcryptService,
  ) {}
  async execute(dto: SignupDto) {
    const hashedPassword = await this.bcryptService.hash(dto.password);
    const user = await this.createUserUseCase.execute({
      ...dto,
      password: hashedPassword,
    });
    return UserResponseMapper.toResponse(user);
  }
}
