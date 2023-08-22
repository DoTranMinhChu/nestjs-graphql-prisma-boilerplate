import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { IS_AUTH_API } from '@decorators/auth/auth.decorator';
import { IS_AUTH_OR_UNAUTH_API } from '@decorators/auth/authOrUnauth.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthApi = this.reflector.getAllAndOverride<boolean>(IS_AUTH_API, [
      context.getHandler(),
      context.getClass(),
    ]);

    const isContainToken = this.isContainToken(context);
    const isAuthOrUnauthApi = this.reflector.getAllAndOverride<boolean>(
      IS_AUTH_OR_UNAUTH_API,
      [context.getHandler(), context.getClass()],
    );

    if (!isAuthApi || (!isContainToken && isAuthOrUnauthApi)) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('server.secret') || 'secret',
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['requester'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
  private isContainToken(context: ExecutionContext): any {
    return !!context.switchToHttp().getRequest()?.headers?.authorization;
  }
}
