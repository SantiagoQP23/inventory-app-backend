import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/modules/users/domain/repositories/user.repository.interface';
import { LoginDto } from '../../interface/dto/login.dto';
import { BcryptService } from '../../infrastructure/encryption/bcrypt.service';
import { JwtService } from '../../infrastructure/jwt/jwt.service';
import { JwtPayload } from '../../interface/jwt-payload.interface';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(dto: LoginDto) {
    const user = await this.userRepository.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.bcryptService.compare(
      dto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      roles: user.userStores.map((us) => ({
        role: us.role,
        storeId: us.storeId,
      })),
    };

    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }
}
