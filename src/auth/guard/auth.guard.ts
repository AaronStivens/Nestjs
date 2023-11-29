import { CanActivate, ExecutionContext, Injectable, UnauthorizedException,Headers } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "../constans/constantes";
import { Request } from "express";


@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwtservice:JwtService){}

    async canActivate(context: ExecutionContext):Promise<boolean>{
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if(!token){
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.jwtservice.verifyAsync(
                token,
                {
                    secret: jwtConstants.secret
                }
            );
            request["usuario"] = payload;
        } catch (error) {throw new UnauthorizedException();
            
        }

        return true;
    }
    
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
      }
}