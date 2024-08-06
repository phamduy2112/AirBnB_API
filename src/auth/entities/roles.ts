import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    if (!requiredRoles) {
      return true; // Nếu không có roles, cho phép tất cả người dùng truy cập
    }

    const request = context.switchToHttp().getRequest();
    const user = request['user_data']; // Đảm bảo rằng user_data có thông tin vai trò

    if (!user || !requiredRoles.includes(user.role)) {
      throw new UnauthorizedException('Insufficient role');
    }
    
    return true;
  }
}