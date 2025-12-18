import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Roles } from '../../../common/enums/user-role.enum';

// gaurd elii bch nverifiw bih ken l user technicien

@Injectable()
export class IsTechGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role !== Roles.ROLE_USER) {
      throw new ForbiddenException('Access denied: technicians only'); //kenoou mch technicien ma3ndouch access w nraj3ou exception
    }

    return true;
  }
}
