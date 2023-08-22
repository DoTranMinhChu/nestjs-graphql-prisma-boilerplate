import { SetMetadata } from '@nestjs/common';

export const IS_GRAPHQL_AUTH = 'isGraphqlAuth';
export const GraphqlAuthApi = () => SetMetadata(IS_GRAPHQL_AUTH, true);
