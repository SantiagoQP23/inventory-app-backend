import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private readonly jwt: NestJwtService) {}

  /**
   * Signs a payload and returns a JWT token
   * @param payload Object with user info, e.g., { userId, email, role }
   */
  async sign(payload: any): Promise<string> {
    return this.jwt.signAsync(payload);
  }

  /**
   * Verifies a JWT token and returns the decoded payload
   * Throws error if invalid
   * @param token JWT token
   */
  async verify(token: string): Promise<any> {
    return this.jwt.verifyAsync(token);
  }
}
