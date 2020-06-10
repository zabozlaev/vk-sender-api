import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtClaims } from './interfaces/jwt-claims';
import { verify, sign } from 'jsonwebtoken';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class TokenService {
  constructor(private readonly config: ConfigService) {}

  public identify(token: string): Promise<JwtClaims> {
    return new Promise<JwtClaims>((resolve, reject) => {
      verify(
        token,
        this.config.get('jwt.secret'),
        {
          ignoreExpiration: false,
        },
        (err, data: JwtClaims) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        },
      );
    });
  }

  public create({ id, email }: UserEntity): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const claims: JwtClaims = {
        id,
        email,
      };

      sign(
        claims,
        this.config.get('jwt.secret'),
        {
          expiresIn: this.config.get('jwt.expires'),
        },
        (err, encoded) => {
          if (err) {
            reject(err);
          }
          resolve(encoded);
        },
      );
    });
  }
}
