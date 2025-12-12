import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
        // njibou token mel header as bearer token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // na3mlou verification lel token kenou expired refuser
      ignoreExpiration: false,
      //clé secrete mte3 token
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }
// kenou valide n3aytoulha automatiquement 
  async validate(payload: any) {
    return { 
        userId: payload.sub,
        email: payload.email, 
        role: payload.role };
  }
}
