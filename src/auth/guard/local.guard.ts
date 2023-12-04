import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class LocalAuthGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        return request.session.authenticated === true; //Si se realiza la sesion se procede con el acceso
    }
  }
