import { Body, Controller, Post } from '@nestjs/common';
import { LoginUseCase } from 'src/modules/auth/application/use-case/login.use-case';
import { SignUpUseCase } from 'src/modules/auth/application/use-case/signup.use-case';
import { LoginDto } from 'src/modules/auth/interface/dto/login.dto';
import { SignupDto } from 'src/modules/auth/interface/dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly signUpUseCase: SignUpUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {} // Replace 'any' with the actual type

  @Post('signup')
  async signUp(@Body() dto: SignupDto) {
    const user = await this.signUpUseCase.execute(dto);
    return {
      message: 'User successfully registered',
      user,
    };
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const resp = await this.loginUseCase.execute(dto);
    return resp;
  }
}
