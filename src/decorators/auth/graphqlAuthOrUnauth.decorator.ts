import { SetMetadata } from '@nestjs/common';

export const IS_GRAPHQL_AUTH_OR_UNAUTH = 'isGraphqlAuthOrUnauth';
export const GraphqlAuthOrUnauth = () =>
  SetMetadata(IS_GRAPHQL_AUTH_OR_UNAUTH, true);
