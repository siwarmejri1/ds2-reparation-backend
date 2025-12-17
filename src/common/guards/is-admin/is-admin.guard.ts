import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Roles } from '../../../common/enums/user-role.enum';

// gaurd elii bch nverifiw bih ken l user admin wala le
@Injectable()
export class IsAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role !== Roles.ROLE_ADMIN) {
      throw new ForbiddenException('Access denied'); //kenoou mch admin ma3ndouch access w nraj3ou error
    }

    return true;
  }
}
