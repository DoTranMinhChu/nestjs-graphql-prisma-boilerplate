import { EAccountType } from '@common/enums/accountType.enum';
import { SetMetadata } from '@nestjs/common';

export const GRAPHQL_ACCOUNT_TYPE = 'graphqlAccountType';
export const GraphqlAccountType = (accountTypes: EAccountType[]) => SetMetadata(GRAPHQL_ACCOUNT_TYPE, accountTypes);