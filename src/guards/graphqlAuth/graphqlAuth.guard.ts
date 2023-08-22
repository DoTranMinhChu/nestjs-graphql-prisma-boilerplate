import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { IS_GRAPHQL_AUTH } from '@decorators/auth/graphqlAuth.decorator';
import { IS_GRAPHQL_AUTH_OR_UNAUTH } from '@decorators/auth/graphqlAuthOrUnauth.decorator';

@Injectable()
export class GraphqlAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const request = gqlContext.getContext().req;
    const isAuthApi = this.reflector.getAllAndOverride<boolean>(
      IS_GRAPHQL_AUTH,
      [gqlContext.getHandler(), gqlContext.getClass()],
    );

    const isContainToken = this.isContainToken(request);
    const isAuthOrUnauthApi = this.reflector.getAllAndOverride<boolean>(
      IS_GRAPHQL_AUTH_OR_UNAUTH,
      [gqlContext.getHandler(), gqlContext.getClass()],
    );

    if (!isAuthApi || (!isContainToken && isAuthOrUnauthApi)) {
      return true;
    }

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('server.secret') || 'secret',
      });
      // Assign the payload to the GraphQL context
      gqlContext.getContext().requester = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
  private extractTokenFromHeader(request: any): string | undefined {
    const authorizationHeader = request.headers.authorization;
    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      const bearerToken = authorizationHeader.substring(7); // Extract the token after 'Bearer '

      return bearerToken;
    }
    return undefined;
  }
  private isContainToken(request: any): any {
    return !!request?.headers?.authorization;
  }
}
