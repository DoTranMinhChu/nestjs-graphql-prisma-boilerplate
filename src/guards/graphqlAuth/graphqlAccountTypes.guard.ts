import { EAccountType } from '@common/enums/accountType.enum';
import { GRAPHQL_ACCOUNT_TYPE } from '@decorators/auth/graphqlAccountType.decorator';

import { RequesterDTO } from '@decorators/auth/requester.decorator';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GraphqlAccountTypesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const accountTypes: any = this.reflector.get<EAccountType>(
      GRAPHQL_ACCOUNT_TYPE,
      context.getHandler(),
    );
    if (!accountTypes) {
      return true;
    }
    const gqlContext = GqlExecutionContext.create(context);
    const request = gqlContext.getContext().req;
    const requester = request.requester as RequesterDTO;
    return accountTypes.includes(requester.type);
  }
}
