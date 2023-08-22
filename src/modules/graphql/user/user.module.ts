import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserRepository } from '@modules/prisma/repositories/user.repository';
import { PrismaRepository } from '@modules/prisma/repositories/prisma.repository';
import { RefreshTokenUserRepository } from '@modules/prisma/repositories/refreshTokenUser.repository';


@Module({
  imports: [
   
  ],
  providers: [
    PrismaRepository,
    UserRepository,
    RefreshTokenUserRepository,

    UserResolver,
  ],
  exports: [],
})
export class UserModule {}
