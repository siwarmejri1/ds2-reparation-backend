import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


// gaurd elii bch nest3amlouh fel routes eli bch na7miwhom bel jwt mte3 authentication
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
