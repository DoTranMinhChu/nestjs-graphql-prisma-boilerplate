import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserModel } from './user.model';
import { UserRepository } from '@modules/prisma/repositories/user.repository';
import { User } from '@prisma/client';
import { RefreshTokenUserRepository } from '@modules/prisma/repositories/refreshTokenUser.repository';
import { GraphqlAccountType } from '@decorators/auth/graphqlAccountType.decorator';
import { EAccountType } from '@common/enums/accountType.enum';
import { GraphqlAuthApi } from '@decorators/auth/graphqlAuth.decorator';

@Resolver(UserModel)
export class UserResolver {
  constructor(
    private userRepository: UserRepository,
    private refreshTokenUserRepository: RefreshTokenUserRepository,
  ) {}

  @Query(() => [UserModel])
  async getAllUsers() {
    return await this.userRepository.findMany({});
  }

  @GraphqlAuthApi()
  @GraphqlAccountType([EAccountType.USER])
  @ResolveField()
  async refreshTokens(@Parent() user: User) {
    const { id } = user;
    return this.refreshTokenUserRepository.findMany({ where: { userId: id } });
  }

  @ResolveField()
  dobFormatted(@Parent() user: User) {
    return user.dob?.toISOString().split('T')[0] || null;
  }
}
