import { Module } from '@nestjs/common';
import { AuthController } from './infrastructure/http/auth/auth.controller';
import { UsersModule } from '../users/users.module';
import { SignUpUseCase } from './application/use-case/signup.use-case';
import { BcryptService } from './infrastructure/encryption/bcrypt.service';
import { JwtService } from './infrastructure/jwt/jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoginUseCase } from './application/use-case/login.use-case';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '5d',
          },
        };
      },
    }),
  ],
  providers: [SignUpUseCase, BcryptService, JwtService, LoginUseCase],
  exports: [BcryptService, JwtService],
})
export class AuthModule {}
