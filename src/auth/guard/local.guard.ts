import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class LocalAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        return request.session && request.session.authenticated === true;
    }
  }
